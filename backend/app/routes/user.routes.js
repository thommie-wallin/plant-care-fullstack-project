// module.exports = app => {
//   const users = require("../controllers/user.controller.js");

//   var router = require("express").Router();

//   // Create a new User
//   router.post("/", users.create);

//   // Retrieve all Users
//   router.get("/", users.findAll);

//   // Retrieve a single User with id
//   router.get("/:id", users.findOne);

//   // Update a User with id
//   router.put("/:id", users.update);

//   // Delete a User with id
//   router.delete("/:id", users.delete);

//   app.use('/api/users', router);
// };

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
  app.get("/api/all", controller.allAccess);
  // app.get("/api/user", [authJwt.verifyToken], controller.userBoard);
  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );
  app.get(
    "/api/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
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
