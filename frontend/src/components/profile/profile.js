import React, { useState, useEffect } from "react";
import { getPlants, delPlant } from "../../services/plants";
import { Link } from "react-router-dom";

function Profile() {
  const [plants, setPlants] = useState([]);
  const [deletePlant, setDeletePlant] = useState(null);  

  useEffect(() => {
    let mounted = true;
    getPlants()
      .then(plants => {
      if(mounted) {
        setPlants(plants);
      }
    })
    return () => mounted = false;
  }, [deletePlant]);

  const handleDelete = (id) => {
    delPlant(id)
    setDeletePlant(id);
  }

  return (
    <div>
      
      <div className="flex justify-between">
        <h1>Plants</h1>
        <div className="flex">
          <Link to="/createplant">
            <button className="w-full sm:h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800 mb-4 font-bold  mr-2 sm:mr-4">Add</button>
          </Link>
          
            {/* <button className="w-full px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800 mb-4 font-bold">Search</button> */}
          
        </div>
      </div>
      
      {/* Cards */}
      <div class="mt-4 mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Card */}
          {plants.map(plant => 
            <div key={plant.id} class="m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
              <div class="m-3">
                <div className="flex justify-between items-center">
                  <Link to={`/updateplant/${plant.id}`}>
                    <h2 class="text-lg mb-2">{plant.name}</h2>
                  </Link>
                  <button  onClick={() => handleDelete(plant.id)} class="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <Link to={`/updateplant/${plant.id}`}>
                  <p class="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">{plant.instruction}</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    

  )
}

export default Profile