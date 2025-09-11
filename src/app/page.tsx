"use client";

import React from 'react';
import SearchBar from "./SearchBar"; 
import './page.css';
import Banner from "./Banner";



import { NearByGooglePlace } from "./lib/NearByGooglePlace";
import { useEffect, useState } from "react";
function Page() {
 const [query, setQuery] = useState<string>("");

  useEffect(()=>{
     (async()=>{
      try{
        const data=await NearByGooglePlace({storeType:"restaurant", maxCount:6});
        console.log("Google Places API result:", data);
      } catch (err) {
        console.error("API error:", err);
      }
    })()
  },[]);

  const handleSearch = (text: string) => {
    setQuery(text);
    console.log("Search for:", text);
    // later: make API call using `text`
  };

  return (
  <main className="mx-auto max-w-7xl p-6">

  <div className="bg">

    <div className= "h1">Let&apos;s grab something</div>

          {query && (
        <Banner title="Preview Banner" subtitle={`Testing 123: ${query}`} />
      )}
    <SearchBar onSearch={handleSearch}/>
  </div>

  </main>
  );
  
}

export default Page;
