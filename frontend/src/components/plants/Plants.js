import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { delPlant } from "../../services/plants";
import SearchPlants from "./plantsearch";
import AuthService from "../../services/auth.service";
import PlantService from "../../services/plant.service";

export default function Plants() {
  const currentUser = AuthService.getCurrentUser();
  const [plants, setPlants] = useState([]);
  const [deletePlant, setDeletePlant] = useState(null);
  const [plantCards, setPlantCards] = useState([]);

  useEffect(() => {
    let mounted = true;
    PlantService.getPlants().then((plants) => {
      if (mounted) {
        setPlants(plants);
        setPlantCards(plants);
      }
    });
    // console.log(plantCards[0]._id);
    return () => (mounted = false);
  }, [deletePlant]);

  const handleDelete = (id) => {
    PlantService.delPlant(id);
    setDeletePlant(id);
  };

  const searchResult = (result) => {
    setPlantCards(result);
  };

  return (
    <div>
      <header className="">
        <h3>
          <strong>Profile</strong> {currentUser.username}
        </h3>
      </header>

      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <h1 className="mx-1">Plants</h1>
          <Link to="/createplant">
            <button className="w-full px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800 font-bold">
              New
            </button>
          </Link>
        </div>

        <div className="flex items-center">
          <SearchPlants plantsList={plants} searchResult={searchResult} />
        </div>
      </div>

      {/* Cards */}
      <div className="mt-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {/* Card */}
          {plantCards.map((plant, index) => (
            <div
              key={index}
              className="m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
            >
              <div class="m-3">
                <div className="flex justify-between items-center">
                  <Link to={`/updateplant/${plant._id}`}>
                    <h2 className="text-lg mb-2">{plant.name}</h2>
                  </Link>
                  <button
                    onClick={() => handleDelete(plant._id)}
                    className="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <Link to={`/updateplant/${plant._id}`}>
                  <p className="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                    {plant.instruction}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
