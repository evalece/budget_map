
import  { Location, GetUserLocation  } from "./GetUserLocation";

/*
IncludePrimaryType:
https://developers.google.com/maps/documentation/places/web-service/place-types?_gl=1*xhiri6*_up*MQ..*_ga*MTk1ODg4NDk5NS4xNzU3NzA3NzA2*_ga_NRWSTWS78N*czE3NTc3MDc3MDYkbzEkZzEkdDE3NTc3MDgyMjckajM1JGwwJGgw#table-a
https://developers.google.com/maps/documentation/places/web-service/nearby-search?_gl=1*1jbj233*_up*MQ..*_ga*MTk1ODg4NDk5NS4xNzU3NzA3NzA2*_ga_NRWSTWS78N*czE3NTc3MDc3MDYkbzEkZzEkdDE3NTc3MDgyMjUkajM3JGwwJGgw
*/

/* 
localStore: 
1. UserLocation 
2. Google Places API result

Refresh Policy
1. If localStore not found 
2. If Userlocation change with +/- N lat and lng
*/

// Modify so that each store must have mandatory fields
const useCache= false;
export interface Place{

  displayName?: string,
  id?:string,
  location?: {
    latitude?: number;
    longitude?: number;
  };
  priceLevel?: number;

}

///Work on this parser later 
function normalizePlaces(data: any): Place[] {
  return (data?.places ?? []).map((p: any) => ({
    displayName: p?.displayName?.text ?? p?.displayName,
    id:p.id,
    location: {
      latitude: Number(p?.location?.latitude ?? p?.location?.latLng?.latitude),
      longitude: Number(p?.location?.longitude ?? p?.location?.latLng?.longitude),
    },
    priceLevel:
      p?.priceLevel !== undefined && p?.priceLevel !== null
        ? Number(p.priceLevel)
        : undefined,
  }));
}




export async function NearByGooglePlace({storeType, maxResult}:{storeType: string, maxResult: number}) : Promise<Place[]>{


  // try retrieve from localStore first unless user location updates 
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
  if (API_KEY){
    console.log(" API_KEY is not null");
  }
 
  const location: Location = await GetUserLocation();

  console.log("Got user location:", location);

  //const cachedAPI = localStorage.getItem(storeType);
  //const cachedLocation = localStorage.getItem("userLocation");
  // ****** Fetch User Cache if User location within threshold
  
  //****** End of Fetch Catch

  console.log("Fetching API1")


  if (!API_KEY) {
    throw new Error("Missing Google API key! Did you set REACT_APP_GOOGLE_API_KEY in .env.local?");
  }



// sanity checks (BEFORE fetch)
if (typeof location?.lat !== "number" || Number.isNaN(location.lat)) {
  throw new Error(`Invalid latitude: ${location?.lat}`);
}
if (typeof location?.lng !== "number" || Number.isNaN(location.lng)) {
  throw new Error(`Invalid longitude: ${location?.lng}`);
}


//const maxResultC = 3; // clamp 1..20
const types = ["restaurant"]; // or [storeType] if it's your variable
console.log("heading res")

const res = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": "places.id,places.displayName,places.location,places.priceLevel",
  },
  body: JSON.stringify({
    includedPrimaryTypes: types,     
    maxResultCount: maxResult,
    rankPreference: "DISTANCE",
    locationRestriction: {
      circle: {
        center: { latitude: location.lat, longitude: location.lng },
        radius: 500,
      },
    },
  }),
});
console.log("complete res")

// IMPORTANT: read the error body so we know exactly what's wrong
if (!res.ok) {
  const errText = await res.clone().text();
  throw new Error(`HTTP ${res.status}`);
}


const data = await res.json();     


return normalizePlaces(data).slice(0, maxResult)  //assume one place 



}



