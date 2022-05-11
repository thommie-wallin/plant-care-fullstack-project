const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/getUsers",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUsers
  );
  app.get(
    "/api/getOneUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneUser
  );
  app.put(
    "/api/updateUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );
  app.delete(
    "/api/deleteUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );
};
