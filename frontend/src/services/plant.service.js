import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://u11-fullstack-backend.herokuapp.com/api/";

const getPlants = () => {
  return axios
    .get(API_URL + "getUserPlants", { headers: authHeader() })
    .then((plants) => plants.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const getPlant = (plantId) => {
  return axios
    .get(API_URL + "getOnePlant", {
      headers: authHeader(),
      params: { id: plantId },
    })
    .then((plant) => plant.data)
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

const createPlant = ([name, instruction]) => {
  axios
    .post(
      API_URL + "createPlant",
      {
        name: name,
        instruction: instruction,
      },
      { headers: authHeader() }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const updatePlant = (plantId, [name, instruction]) => {
  axios
    .put(
      API_URL + "updatePlant",
      {
        id: plantId,
        name: name,
        instruction: instruction,
      },
      { headers: authHeader() }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const delPlant = (plantId) => {
  axios.delete(API_URL + "deletePlant", {
    headers: authHeader(),
    params: { id: plantId },
  });
};

const PlantService = {
  getPlants,
  getPlant,
  createPlant,
  updatePlant,
  delPlant,
};
export default PlantService;
