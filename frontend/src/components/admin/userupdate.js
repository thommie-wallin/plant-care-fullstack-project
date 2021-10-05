import React, { useState, useEffect } from "react";
import { getUser, updateUser } from "../../services/users";

function UpdateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    let mounted = true;
    getUser(6)
      .then(users => {
      if(mounted) {
        setUsername(users.username);
        setPassword(users.password);
        setAdmin(users.admin);
      }
    })
    return () => mounted = false;
  }, []);

  const handleChange = () => {
    setAdmin(admin ? false : true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(6, [username, password, admin])
  };

  return (
    <div className="h-full flex flex-col justify-evenly items-center">
        <h1>Update user</h1>
        <div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label className="m-2">
                <p>Username</p>
                <input value={username} type="text" onChange={event => setUsername(event.target.value)} />
              </label>
              <label className="m-2">
                <p>Password</p>
                <input value={password} type="text" onChange={event => setPassword(event.target.value)} />
              </label>
              
              {/* Radio buttons */}
              {/* <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="true"     
                    checked={admin === true}
                    // onChange={event => setAdmin(event.target.value)}
                    onChange={handleChange}
                  />
                  Admin
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={admin === false}
                    // onChange={event => setAdmin(event.target.value)}
                    onChange={handleChange}
                  />
                  User
                </label>
              </div> */}

              <div className="flex justify-center">
                <label>
                  <input 
                    type="checkbox"
                    checked={admin}
                    onChange={handleChange} 
                  />
                  <span className="ml-1">Admin</span>
                </label>
              </div>
              
              
              <input type="submit" value="Update" className="h-10 px-5 m-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 font-bold" />
            </form>
        </div>
    </div>
  )
}

export default UpdateUser