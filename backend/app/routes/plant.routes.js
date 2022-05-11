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
  app.post("/api/searchPlants", [authJwt.verifyToken], controller.searchPlants);
  app.put("/api/updatePlant", [authJwt.verifyToken], controller.updatePlant);
  app.delete("/api/deletePlant", [authJwt.verifyToken], controller.deletePlant);
};
