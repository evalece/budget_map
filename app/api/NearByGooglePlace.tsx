
import  { Location, GetUserLocation  } from "@/lib/GetUserLocation";
import {Place } from "@/types/Place";
import {normalizePlaces} from "@/lib/NormalizePlaces"



export async function NearByGooglePlace(storeType: string, maxResult: number) : Promise<Place[]>{


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
    "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.location,places.priceLevel",
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
console.log(data)


return normalizePlaces(data).slice(0, maxResult)  //assume one place 



}



