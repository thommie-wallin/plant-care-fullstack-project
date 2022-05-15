import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import Spinner from "../images/spinner";

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

function Login() {
  let history = useHistory();
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          history.push("/profile");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="h-full bg-gray-100 md:w-80 flex flex-col justify-evenly items-center border border-black rounded p-5">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="rounded-full w-1/2 my-10"
        />
        <h1 className="">Login</h1>
        <div>
          <Form className="flex flex-col" onSubmit={handleLogin} ref={form}>
            <div className="m-2">
              <label htmlFor="username">
                <p>Username</p>
                <Input
                  className="border rounded-md focus:outline-none"
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required]}
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
                  validations={[required]}
                />
              </label>
            </div>
            <div className="m-2 flex justify-center">
              <button
                className="p-5 m-4 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 font-bold"
                disabled={loading}
              >
                <div className="flex justify-center align-center">
                  {loading && (
                    <div className="mr-1">
                      <Spinner />
                    </div>
                  )}
                  <div className="flex align-center justify-center">
                    <span>Login</span>
                  </div>
                </div>
              </button>
            </div>
            {message && (
              <div>
                <div
                  className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{message}</span>
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

export default Login;
