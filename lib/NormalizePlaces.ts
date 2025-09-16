
import {Place } from "@/types/Place";

/*
IncludePrimaryType:
https://developers.google.com/maps/documentation/places/web-service/place-types?_gl=1*xhiri6*_up*MQ..*_ga*MTk1ODg4NDk5NS4xNzU3NzA3NzA2*_ga_NRWSTWS78N*czE3NTc3MDc3MDYkbzEkZzEkdDE3NTc3MDgyMjckajM1JGwwJGgw#table-a
https://developers.google.com/maps/documentation/places/web-service/nearby-search?_gl=1*1jbj233*_up*MQ..*_ga*MTk1ODg4NDk5NS4xNzU3NzA3NzA2*_ga_NRWSTWS78N*czE3NTc3MDc3MDYkbzEkZzEkdDE3NTc3MDgyMjUkajM3JGwwJGgw
*/

/*  API PriceLevel:
https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#PriceLevel
*/

const priceLevelMap: Record<string, number> = { //API v1 price level defition
  PRICE_LEVEL_UNSPECIFIED: 0,
  PRICE_LEVEL_FREE: 1,
  PRICE_LEVEL_INEXPENSIVE: 2,
  PRICE_LEVEL_MODERATE: 3,
  PRICE_LEVEL_EXPENSIVE: 4,
  PRICE_LEVEL_VERY_EXPENSIVE: 5,
};


/* 
localStore: 
1. UserLocation 
2. Google Places API result

Refresh Policy
1. If localStore not found 
2. If Userlocation change with +/- N lat and lng
*/


//to do:
// fix to return exactly one type
export function normalizePlaces(data: any): Place[] {
  return (data?.places ?? []).map((p: any) => ({
    displayName: p?.displayName?.text ?? p?.displayName , //string undefined,  // if undefined, no need to redefine undefined.
    id:p?.id, //string undefined, 
    formattedAddress:
    p?.formattedAddress?.text?? p?.formattedAddress, //string undefined, 

    location: {
      latitude: Number(p?.location?.latitude ?? p?.location?.latLng?.latitude?? undefined), //number
      longitude: Number(p?.location?.longitude ?? p?.location?.latLng?.longitude?? undefined ), //number
    },
    priceLevel:
      p?.priceLevel?.text?? p?.priceLevel??undefined // string
  }));
}


