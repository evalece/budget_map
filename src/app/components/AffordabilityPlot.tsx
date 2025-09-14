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

    /**
     Do to: parse Place into an array, 

     const lng=
     const lat=
     const pricelevel=
     const label= 
     */

  return (
    <div className="w-full h-[500px]">
      <Plot
        data={[
          {
            type: "scattergl", // WebGL-powered scatter
            mode: "markers",
            x: lngs,
            y: lats,
            text: texts,
            hoverinfo: "text",
            marker: { color: colors, size: 12, opacity: 0.8 },
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
