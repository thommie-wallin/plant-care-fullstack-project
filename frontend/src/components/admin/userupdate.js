import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useParams } from "react-router";
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

function UpdateUser() {
  const form = useRef();
  const checkBtn = useRef();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    let mounted = true;
    UserService.getUser(id).then((user) => {
      if (mounted) {
        setUserId(user.id);
        setUsername(user.username);
        setEmail(user.email);
        user.roles.forEach((value) => {
          if (value === "user") {
            setUser(true);
          } else {
            setAdmin(true);
          }
        });
      }
    });
    return () => (mounted = false);
  }, [id]);

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeAdmin = () => setAdmin(admin ? false : true);
  const handleChangeUser = () => setUser(user ? false : true);

  const handleUpdate = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      let roles = [];
      admin && roles.push("admin");
      user && roles.push("user");
      !user && !admin && roles.push("user");

      UserService.updateUser(userId, username, email, roles)
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
        <h1>Update user</h1>
        <div>
          <Form className="flex flex-col" onSubmit={handleUpdate} ref={form}>
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
                    Update
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

export default UpdateUser;
