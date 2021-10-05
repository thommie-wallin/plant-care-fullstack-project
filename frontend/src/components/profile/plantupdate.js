import React, { useState, useEffect } from "react";
import { getPlant, updatePlant } from "../../services/plants";

function UpdatePlant() {
  const [name, setName] = useState('');
  const [instruction, setInstruction] = useState('');

  useEffect(() => {
    let mounted = true;
    getPlant(1)
      .then(plant => {
      if(mounted) {
        // setPlants(plants);
        setName(plant.name)
        setInstruction(plant.instruction)
        console.log(plant)
      }
    })
    return () => mounted = false;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlant(1, [name, instruction])
  };

  return (
    <div className="h-full flex flex-col justify-evenly items-center">
        <h1>Add new plant</h1>
        <div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="m-2">
                <p>Name</p>
                <input value={name} className="rounded-md" type="text" onChange={event => setName(event.target.value)} />
              </label>
              <label className="m-2">
                <p>Instruction</p>
                <textarea value={instruction} className="w-full sm:resize border rounded-md" onChange={event => setInstruction(event.target.value)}></textarea>
              </label>
              <input type="submit" value="Update" className="max-w-sm h-10 px-5 m-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 font-bold" />
            </form>
        </div>
    </div>
  )
}

export default UpdatePlant