
// Cards for NearByGooglePlace (Google API, user location and caching logic)  WidgetBox (Widget frontend)

// !isNaN  => always false 

import {Place} from "../lib/NearByGooglePlace";

export default function PlacesCard({ place }: { place: Place }){

      return (
    <div className="rounded-lg border p-4 shadow bg-transparent
">
      <h3 className="text-lg font-semibold">{place.displayName ?? "Unnamed place"}</h3>

      {
        /* 
      place.location && (
        <p className="text-sm text-gray-500">
          Lat: {place.location.latitude}, Lng: {place.location.longitude}
        </p>
      )
        */
      }
        
      {// must render price level.
        <p className="text-sm">Price: {place.priceLevel ==null || undefined ?"We are working on it!":place.priceLevel}</p>
      }

    {place.formattedAddress !== undefined && (
        
        <p className="text-sm">Address: {place.formattedAddress == null? "We are working on it!": place.formattedAddress }</p>
      )}
    </div>
    
  );

}





