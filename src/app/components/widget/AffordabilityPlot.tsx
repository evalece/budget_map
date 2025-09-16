"use client";

import Plot from "react-plotly.js";
import {Place} from "../../lib/NearByGooglePlace";


// Color-PriceLevel Mapping 
const priceColor: Record <string,string>={
PRICE_LEVEL_UNSPECIFIED	: "#5a5a5aff",
PRICE_LEVEL_FREE	: "#939393ff",
PRICE_LEVEL_INEXPENSIVE	: "#4bb74cff",
PRICE_LEVEL_MODERATE	: "#33a3a9ff",
PRICE_LEVEL_EXPENSIVE	: "#a84c98ff",
PRICE_LEVEL_VERY_EXPENSIVE	: "#6e21acff"

}

// plot re-render iff place updates, useMemo() to keep track on dependent data
// in this case, we allow JSX passing from page. 
// Learned: avoid having functions returning JSX, which makes calls to another function that also returns JSX


export default function AffordabilityPlot({place}:{place:Place[]}) {

    // Parse, keep only items with valid lat,lng and priceLevel
    const cleanedPlaces:Place[]= place.filter(p=>p.location?.longitude != undefined && p.location.longitude != undefined && p.priceLevel != undefined);

    const lngs=  cleanedPlaces.map(p=>p.location.longitude as number);
    const lats= cleanedPlaces.map(p=>p.location.latitude as number);
    const pricelevel= cleanedPlaces.map((p=>priceColor[p.priceLevel]));
    const labels= cleanedPlaces.map((p) => `${p.displayName}<br>Price: ${p.priceLevel} <br>Address: ${p.formattedAddress} <br>Debug: ${p.location.latitude},${p.location.longitude}`)
    const priceColorMap= cleanedPlaces.map((p=>priceColor[p.priceLevel]));

  return (
    <div className="w-full h-[500px]">
      <Plot
        data={[
          {
            type: "scattergl", // WebGL-powered scatter
            mode: "markers",
            x: lngs,
            y: lats,
            text: labels,
            hoverinfo:"text",
            marker: { color: priceColorMap, size: 12, opacity: 0.8 },
          },
        ]}
        layout={{
          title: { text: "Affordability scatter (lon/lat)"},
          xaxis: { title:  { text:"Longitude" } },
          yaxis: { title: { text:"Latitude" }},
          margin: { t: 40, r: 10, l: 40, b: 40 },
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
