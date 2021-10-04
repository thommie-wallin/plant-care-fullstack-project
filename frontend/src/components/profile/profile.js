import React, { useState, useEffect } from "react";

function Profile() {
  const [list, setList] = useState([]);

  return (
    <div>
      <div className="flex justify-between">
        <h1>Plants</h1>
        <div className="flex">
          <button className="w-full sm:h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800 mb-4 font-bold  mr-2 sm:mr-4">Add</button>
          <button className="w-full px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded focus:shadow-outline hover:bg-indigo-800 mb-4 font-bold">Search</button>
        </div>
        
      </div>
      <div className="bg-black ">
        <ul>
          {list.map(item => <li key={item.id}>{item.movie}</li>)}
        </ul>
      </div>
    </div>

  )
}

export default Profile