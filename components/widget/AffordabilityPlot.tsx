"use client";

import Plot from "react-plotly.js"
import dynamic from "next/dynamic";
//import { useMemo } from "react";
import {Place } from "@/types/Place";
// Allow user end plotting:
import  { Location, GetUserLocation  } from "@/lib/GetUserLocation";
import { useEffect, useState } from "react";

const Plot1 = dynamic(() => import("react-plotly.js"), { ssr: false });

// Color-PriceLevel Mapping 
const priceColor: Record <string,string>={
PRICE_LEVEL_UNSPECIFIED	: "#5a5a5aff",
PRICE_LEVEL_FREE	: "#939393ff",
PRICE_LEVEL_INEXPENSIVE	: "#00c503ff",
PRICE_LEVEL_MODERATE	: "#143ccfff",
PRICE_LEVEL_EXPENSIVE	: "#a84c98ff",
PRICE_LEVEL_VERY_EXPENSIVE	: "#6e21acff"

}

// plot re-render iff place updates, useMemo() to keep track on dependent data
// in this case, we allow JSX passing from page. 
// Learned: avoid having functions returning JSX, which makes calls to another function that also returns JSX


export  function AffordabilityPlot({place}:{place:Place[]}) {

    // Parse, keep only items with valid lat,lng and priceLevel
    const cleanedPlaces:Place[]= place.filter(p=>p.location?.longitude != undefined && p.location.longitude != undefined && p.priceLevel != undefined);

    const lngs=  cleanedPlaces.map(p=>p.location.longitude as number);
    const lats= cleanedPlaces.map(p=>p.location.latitude as number);
    const pricelevel= cleanedPlaces.map((p=>priceColor[p.priceLevel]));
    const labels= cleanedPlaces.map((p) => `${p.displayName}<br>Price: ${p.priceLevel} <br>Address: ${p.formattedAddress} <br>Debug: ${p.location.latitude},${p.location.longitude}`)
    const priceColorMap= cleanedPlaces.map((p=>priceColor[p.priceLevel]));
    const [userLocation, setUserLocation]=useState<Location|null>(null);
    const [loading, setLoading]=useState<Boolean>(false);


 useEffect(()=>{

(async()=>{
    try{
      setLoading(true);
      const loc:Location= await GetUserLocation();
      setUserLocation(loc);
    } 
    catch(e){
       console.log(`"error at Affplot ${e}"`);
    }
    finally{
      console.log("complete location");
      setLoading(false);

    }
}

)()

 },[]

)


  if(loading) return <div>Loading Addordability and Location Plot</div>




     const traces: any[] = [
    {
      type: "scattergl",
      mode: "markers",
      x: lngs,
      y: lats,
      text: labels,
      hoverinfo: "text",
      marker: { color: priceColorMap, size: 12, opacity: 0.8 },
      name: "Places",
    },
  ];




    if (userLocation?.lat !== undefined && userLocation?.lng !== undefined) {

      const userLng:number=userLocation.lng;
      const userLat:number=userLocation.lat;

    console.log(`"Plot got location from User ${userLocation.lng}, ${userLocation.lat}"`)
    traces.push({
      type: "scattergl",
      mode: "markers",
      x: [userLng],
      y: [userLat],
      text: ["You are here"],
      textposition: "top center",
      marker: { color: "red", size: 16, symbol: "star" },
      name: "User location",
      hoverinfo: "text",
    });
  }



  return (

    

    <div className="w-full h-[500px]">
      <Plot1
        data={traces}
        layout={{
          title: { text: "Affordability scatter (lon/lat)" },
          xaxis: { autorange: true, automargin: true, title: { text: "Longitude" } },
          yaxis: { autorange: true, automargin: true, title: { text: "Latitude" } },
          margin: { t: 40, r: 10, l: 40, b: 40 },
        }}
        config={{ responsive: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>


  );
}
