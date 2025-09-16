
// Renders and make calls to AffordabilityPlot.tsx

/*

Consider provider pattern if place[] is shared in multiple component
 */

"use client";
import { ReactNode } from "react";

import React, { useEffect, useState } from "react";
import AffordabilityPlot from "../cards/AffordabilityPlot"

import { Place,NearByGooglePlace } from "../../lib/NearByGooglePlace";

type Props= {storeType: string; maxResult:number}; // same for nearBy related API calls

/*
to dos: 

useMemo to avoid redundant computation in plot, 
*/

export function WidgetAffordabilityPlot({ storeType, maxResult }: Props){

const [error, setError]=useState <string|null> (null);
const [loading, setLoading]= useState<boolean>(false);
const [reseult, setResult]=useState<>
    
    useEffect((()=>{
        let cancelled= false;

        (async()=>{

        

            try{
            setLoading(true);
             const place=await NearByGooglePlace({ storeType, maxResult }); 
            }catch (e:any){
                 if (!cancelled) setError(e?.message ?? "Failed to load places");
            }  finally {
            if (!cancelled) setLoading(false);
            }

            } // end of async
           
        )


    }
    ),[])// end of useEffect


    // Early return rendering while loading;  
    if (loading) return <div> Budget Map is loading ... </div>
    if (error) return <div role="alert">Error: {error}</div>;   

    // rendering here:
    return 

}