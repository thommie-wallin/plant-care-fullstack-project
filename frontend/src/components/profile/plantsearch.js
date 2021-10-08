import React, { useState } from "react";

function SearchPlants ({ plantsList, searchResult }) {

  const handleChange = (e) => {

    // Filter plants with search term
    const filteredPlants = plantsList.filter(
      plant => {
        return (
          plant
          .name
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
        );
      }
    );
    
    // Send result to parent
    searchResult(filteredPlants)
  };

  return (  
    <div className="mx-1">
      <input 
        
        type = "search" 
        placeholder = "Search Plants" 
        onChange = {handleChange}
      />
    </div>
  )
}

export default SearchPlants