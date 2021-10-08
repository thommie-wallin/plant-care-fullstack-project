import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../services/users";

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser([username, password, admin])
    history.push("/login");
  };

  return (
    <div className="h-full flex flex-col justify-evenly items-center">
        <h1>Register</h1>
        <div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="m-2">
                <p>Username</p>
                <input type="text" onChange={event => setUsername(event.target.value)} />
              </label>
              <label className="m-2">
                <p>Password</p>
                <input type="text" onChange={event => setPassword(event.target.value)} />
              </label>            
              <input type="submit" value="Register" className="h-10 px-5 m-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 font-bold" />            
            </form>
        </div>
    </div>
  )
}

export default Register