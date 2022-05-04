import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/";

const createUser = (username, email, password, roles) => {
  return axios
    .post(
      API_URL + "auth/signup",
      {
        username: username,
        email: email,
        password: password,
        roles: roles,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getUsers = () => {
  return axios
    .get(API_URL + "getUsers", { headers: authHeader() })
    .then((users) => users.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const getUser = (userId) => {
  return axios
    .get(API_URL + "getOneUser", {
      headers: authHeader(),
      params: { id: userId },
    })
    .then((user) => user.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const updateUser = (userId, username, email, password, roles) => {
  return axios
    .put(
      API_URL + "updateUser",
      {
        id: userId,
        username: username,
        email: email,
        password: password,
        roles: roles,
      },
      { headers: authHeader() }
    )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const deleteUser = (userId) => {
  return axios
    .delete(API_URL + "deleteUser", {
      headers: authHeader(),
      params: { id: userId },
    })
    .then((user) => user.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  // fetch(`http://localhost:8080/api/users/` + usertId, {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ usertId }),
  // }).then((data) => data.json());
};

const UserService = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  // getPublicContent,
  // getUserBoard,
  // getModeratorBoard,
  // getAdminBoard,
};

export default UserService;
