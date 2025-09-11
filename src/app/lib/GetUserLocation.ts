// Follow Best Practice on API Keys
// ref: https://developers.google.com/maps/documentation/places/web-service/nearby-search?_gl=1*dutt1p*_up*MQ..*_ga*MTI0NjUzMDYyMC4xNzU2OTM2MjY1*_ga_NRWSTWS78N*czE3NTY5MzYyNjUkbzEkZzEkdDE3NTY5MzYzNTAkajM1JGwwJGgw

export interface Location {
  lat: number;
  lng: number;
}


export async function GetUserLocation(): Promise<Location> {


  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation not supported"));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        resolve(userLoc);
      },
      (error) => reject(error)
    );
  });

}


