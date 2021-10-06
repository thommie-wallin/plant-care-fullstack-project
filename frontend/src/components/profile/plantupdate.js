import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getPlant, updatePlant } from "../../services/plants";
import { useHistory } from "react-router-dom";

function UpdatePlant() {
  const [name, setName] = useState('');
  const [instruction, setInstruction] = useState('');
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    let mounted = true;
    getPlant(id)
      .then(plant => {
      if(mounted) {
        setName(plant.name)
        setInstruction(plant.instruction)
      }
    })
    return () => mounted = false;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlant(id, [name, instruction])
    history.push("/profile");
  };

  return (
    <div className="h-full flex flex-col justify-evenly items-center">
        <h1>Update plant</h1>
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