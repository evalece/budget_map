"use client";

import React, { useEffect } from "react";
import {Place } from "@/types/Place";
import { NearByGooglePlace} from "@/app/api/NearByGooglePlace";
import  { useState } from "react";
import { WidgetBox }  from "@/components/widget/WidgetBox";
import "./page.css";
import  {AffordabilityPlot} from "@/components/widget/AffordabilityPlot"

export default function Page(){

  const [result,setResult]=useState<null| Place[]>(null);
  const [load, setLoad]= useState(false);
  const [error, setError]= useState<string|null>(null);
  const [count, setCount] = useState(5); // store query count

  useEffect(()=>{
    setLoad(true);

    (async()=>{
      try{
          const results = await NearByGooglePlace("Food and Drink",count);
          setResult(results);
          console.log(results);
      }catch(e){

        setError(`"Loading error log: ${e}"`);
      }
      finally{
        console.log("complete");
        setLoad(false);
      }
        

  })();


  },[]);


  if (load) return <div>Loading Budget Distribution Map</div>
  if (error) return <div> {error} </div>



  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Let&apos;s grab something</h1>



     <section>


              
    < AffordabilityPlot place={result??[]}>
    </AffordabilityPlot>
       {
        <WidgetBox storeType="Food and Drink" maxResult={count}>
        </WidgetBox>
         }



      </section>
    </main>

  )
}
