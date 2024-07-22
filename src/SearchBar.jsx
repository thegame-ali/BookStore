/* eslint-disable react/prop-types */
import { useState } from "react";
import './SearchBar.css'

export default function SearchBar({handleSearch}){

const [query,setQuery]=useState("")

const onclick=(evt)=>{
  evt.preventDefault();
OnSearch();
}



  const OnSearch = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (  
    <div className="search-bar-container">
      <input 
         className="search-input"
        type="text" 
        value={query} 
        onChange={OnSearch} 
        placeholder="Search by title, author, or genre"
      />
      <button onClick={onclick} className="search-button" >Search</button>
    </div>
  );
}








