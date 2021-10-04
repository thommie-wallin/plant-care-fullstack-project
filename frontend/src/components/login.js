import React, { useState, useEffect } from "react";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <div className="h-full flex flex-col justify-evenly items-center">
        <h1>Login</h1>
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
              <input type="submit" value="Login" className="h-10 px-5 m-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" />
            </form>
        </div>
    </div>
  )
}

export default Login