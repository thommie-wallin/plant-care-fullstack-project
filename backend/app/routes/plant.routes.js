module.exports = app => {
  const plants = require("../controllers/plant.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", plants.create);

  // Retrieve all Plants with single user_id
  router.get("/:id", plants.findAll);

  // Retrieve a single Plants with id
  router.get("/id/:id", plants.findOne);

  // Update a Plant with id
  router.put("/:id", plants.update);

  // Delete a Plant with id
  router.delete("/:id", plants.delete);

  app.use('/api/plants', router);
};