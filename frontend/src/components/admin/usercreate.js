import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useHistory } from "react-router-dom";
import UserService from "../../services/user.service";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">This field is required!</span>
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div
        className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">This is not a valid email.</span>
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div
        className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">
          The username must be between 3 and 20 characters.
        </span>
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div
        className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">
          The password must be between 6 and 40 characters.
        </span>
      </div>
    );
  }
};

function CreateUser() {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  let history = useHistory();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleChangeAdmin = () => {
    setAdmin(admin ? false : true);
  };
  const handleChangeUser = () => {
    setUser(user ? false : true);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      let roles = [];
      admin && roles.push("admin");
      user && roles.push("user");

      UserService.createUser(username, email, password, roles)
        .then((response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        });
    }
  };

  const handleClick = () => {
    history.push("/admin");
  };

  return (
    <div className="flex justify-center">
      <div className="h-full bg-gray-100 md:w-80 flex flex-col justify-evenly items-center border border-black rounded p-5">
        <h1>Create a new user</h1>
        <div>
          <Form className="flex flex-col" onSubmit={handleCreate} ref={form}>
            {!successful && (
              <div>
                <div className="m-2">
                  <label htmlFor="username">
                    <p>Username</p>
                    <Input
                      className="border rounded-md focus:outline-none"
                      type="text"
                      name="username"
                      value={username}
                      onChange={onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </label>
                </div>
                <div className="m-2">
                  <label htmlFor="email">
                    <p>Email</p>
                    <Input
                      className="border rounded-md focus:outline-none"
                      type="text"
                      name="email"
                      value={email}
                      onChange={onChangeEmail}
                      validations={[required, validEmail]}
                    />
                  </label>
                </div>
                <div className="m-2">
                  <label htmlFor="password">
                    <p>Password</p>
                    <Input
                      className="border rounded-md focus:outline-none"
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </label>
                </div>
                <div className="flex justify-center">
                  <label htmlFor="admin">
                    <p>Admin</p>
                    <Input
                      type="checkbox"
                      checked={admin}
                      onChange={handleChangeAdmin}
                    />
                  </label>
                  <label htmlFor="user">
                    <p>User</p>
                    <Input
                      type="checkbox"
                      checked={user}
                      onChange={handleChangeUser}
                    />
                  </label>
                </div>
                <div className="m-2 flex justify-center">
                  <button className="p-5 m-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 font-bold">
                    Create
                  </button>
                </div>
              </div>
            )}
            {message && (
              <div>
                <div
                  className={
                    successful
                      ? "bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded"
                      : "bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded"
                  }
                  role="alert"
                >
                  <span className="block sm:inline">{message}</span>
                </div>
                <div className="m-2 flex justify-center">
                  <button
                    className="p-5 m-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 font-bold"
                    onClick={handleClick}
                  >
                    Ok
                  </button>
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
