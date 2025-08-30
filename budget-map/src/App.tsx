import React from 'react';
import SearchBar from "./SearchBar"; 
import './App.css';
import Banner from "./Banner";

function App() {

  const handleSearch = (text:string) => {
    <Banner title="Preview Banner" subtitle="Testing 123" />
    console.log("Search for: ", text);
    // later: make API call
  }


  return (
  <div className="bg">

    <div className= "h1">Let's grab something</div>
    <SearchBar onSearch={handleSearch}/>
  </div>
  );
}

export default App;
