"use client";

import Plot from "react-plotly.js";
import {Place} from "../lib/NearByGooglePlace";


// Color-PriceLevel Mapping 
const priceColor: Record <string,string>={
PRICE_LEVEL_UNSPECIFIED	: "#5a5a5aff",
PRICE_LEVEL_FREE	: "#939393ff",
PRICE_LEVEL_INEXPENSIVE	: "#4bb74cff",
PRICE_LEVEL_MODERATE	: "#33a3a9ff",
PRICE_LEVEL_EXPENSIVE	: "#a84c98ff",
PRICE_LEVEL_VERY_EXPENSIVE	: "#6e21acff"

}

export default function AffordabilityPlot({place}:{place:Place[]}) {

/*

to do: 
check back after normalizePlaces
*/

    const lngs=  place.filter(p=>p.location?.longitude != undefined && p.location.longitude != undefined).map(p=>p.location.longitude as number);
    const lats= place.filter(p=>p.location.latitude != undefined && p.location.latitude != undefined).map(p=>p.location.latitude as number);
    const pricelevel= place.map((p)=>p.priceLevel);
    //const labels= place.map((p) => `${p.displayName}<br>Price: ${p.priceLevel} <br>Address: ${p.formattedAddress} <br>Debug: ${p.location.latitude},${p.location.longitude}`)
    const priceColorMap= place.map((p=>priceColor[p.priceLevel]));

  return (
    <div className="w-full h-[500px]">
      <Plot
        data={[
          {
            type: "scattergl", // WebGL-powered scatter
            mode: "markers",
            x: lngs,
            y: lats,
            //text: labels,
            hoverinfo: "Location and Budget Distribution Information",
            marker: { color: priceColorMap, size: 12, opacity: 0.8 },
          },
        ]}
        layout={{
          title: "Affordability scatter (lon/lat)",
          xaxis: { title: "Longitude" },
          yaxis: { title: "Latitude" },
          margin: { t: 40, r: 10, l: 40, b: 40 },
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
