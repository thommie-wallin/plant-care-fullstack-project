// module.exports = app => {
//   const plants = require("../controllers/plant.controller.js");

//   var router = require("express").Router();

//   // Create a new User
//   router.post("/", plants.create);

//   // Retrieve all Plants with single user_id
//   router.get("/:id", plants.findAll);

//   // Retrieve a single Plants with id
//   router.get("/id/:id", plants.findOne);

//   // Update a Plant with id
//   router.put("/:id", plants.update);

//   // Delete a Plant with id
//   router.delete("/:id", plants.delete);

//   app.use('/api/plants', router);
// };

const { authJwt } = require("../middlewares");
const controller = require("../controllers/plant.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/createPlant", [authJwt.verifyToken], controller.createPlant);
  app.get(
    "/api/getUserPlants",
    [authJwt.verifyToken],
    controller.getUserPlants
  );
  app.get("/api/getOnePlant", [authJwt.verifyToken], controller.getOnePlant);
  app.put("/api/updatePlant", [authJwt.verifyToken], controller.updatePlant);
  app.delete("/api/deletePlant", [authJwt.verifyToken], controller.deletePlant);
};
