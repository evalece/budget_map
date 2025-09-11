
import  { Location, GetUserLocation  } from "./GetUserLocation";



/* 
localStore: 
1. UserLocation 
2. Google Places API result

Refresh Policy
1. If localStore not found 
2. If Userlocation change with +/- N lat and lng
*/


const useCache= false;
export interface Place{

  displayName?: string 
  location?: {
    latitude?: number;
    longitude?: number;
  };
  priceLevel?: number;

}


function normalizePlaces(data: any): Place[] {
  return (data?.places ?? []).map((p: any) => ({
    displayName: p?.displayName?.text ?? p?.displayName,
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




export async function NearByGooglePlace({storeType, maxCount}:{storeType: string, maxCount: number}) : Promise<Place>{


  // try retrieve from localStore first unless user location updates 
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
  console.log(" API_KEY=", API_KEY);
  const location: Location = await GetUserLocation();

  console.log("Got user location:", location);

  const cachedAPI = localStorage.getItem(storeType);
  const cachedLocation = localStorage.getItem("userLocation");
  if(cachedAPI && cachedLocation && useCache){
    if (JSON.parse(cachedLocation).lat-location.lat<2 && JSON.parse(cachedLocation).lng-location.lng<2){ //*** */ Allowable Cache Re-use policy

      console.log("Returning Cache")
     // console.log(JSON.parse(cachedAPI))

      if(!cachedAPI){
        return normalizePlaces(cachedAPI)[0]
      }
        
    }
  }

  console.log("Fetching API")


  if (!API_KEY) {
    throw new Error("Missing Google API key! Did you set REACT_APP_GOOGLE_API_KEY in .env.local?");
  }
  const res = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
  
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": [
      "places.displayName",
      "places.location",
      "places.priceLevel"

      
      ].join(",")

    },
    body: JSON.stringify({
      includedTypes: storeType,
      maxResultCount: maxCount,
      rankPreference: "DISTANCE",   
      locationRestriction: {
        circle: {
          center: {
            latitude:location.lat,
            longitude:location.lng
          },
          radius: 500.0
        },
      },
    }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();          
  const places = normalizePlaces(data)[0];  

  if(places){  //***Store Cache
      localStorage.setItem(
      storeType,
      JSON.stringify({
        place: places.displayName,
        lat: location.lat,
        lng: location.lng,
        priceLevel: places.priceLevel
        //timestamp: Date.now(),
      })
    );
    localStorage.setItem(
      "userLocation", JSON.stringify({
        lng:location.lng,
        lat:location.lat
      })
    )
  }



  return places;   //assume one place 



}



