
import React, {useState} from "react";
// show search listings or default listing of merchants/ events of user's location
// take search results from parent 

//format of Search result 

interface SearchResult{
    id: string
    name: string
    url: string 
    image: string 
    star: number
    log_lat: number[]
    price: number[] // min and max
}

 
interface ListingProps {
    results: SearchResult[]
}


const Listing: React.FC<ListingProps> = ({results})=>{
    

    return (
    <div>
        <ul>
            {results.map(r => (
                <li id={r.id}>r.name r.star r.price[0] r.price[1]</li>
            ))}
        </ul>
    
    </div>
    )

}
