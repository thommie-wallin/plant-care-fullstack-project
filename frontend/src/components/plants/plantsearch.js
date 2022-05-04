import React from "react";

function SearchPlants({ plantsList, searchResult }) {
  const handleChange = (e) => {
    // Filter plants with search term
    const filteredPlants = plantsList.filter((plant) => {
      return plant.name.toLowerCase().includes(e.target.value.toLowerCase());
    });

    // Send result to parent
    searchResult(filteredPlants);
  };

  return (
    <div className="mx-1 border border-gray-400">
      <input
        className="focus:outline-none"
        type="search"
        placeholder="Search Plants"
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchPlants;
