const db = require("../models");
const Plant = db.plants;

// Create and Save a new Plant
exports.createPlant = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.instruction) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Plant
  const plant = new Plant({
    name: req.body.name,
    instruction: req.body.instruction,
    user_id: req.userId,
  });

  // Save Plant in the database
  plant
    .save(plant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Plant.",
      });
    });
};

// Retrieve all Plant with user_id from the database.
exports.getUserPlants = (req, res) => {
  // const id = req.params.id;
  const id = req.userId;
  var condition = { user_id: id };

  Plant.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving plants.",
      });
    });
};

// Find a single Plant with an id
exports.getOnePlant = (req, res) => {
  const id = req.query.id;
  // const id = req.body.id;

  Plant.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Plant with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Plant with id=" + id });
    });
};

// Update a Plant by the id in the request
exports.updatePlant = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  // const id = req.params.id;
  const id = req.body.id;

  Plant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plant with id=${id}. Maybe Plant was not found!`,
        });
      } else res.send({ message: "Plant was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plant with id=" + id,
      });
    });
};

// Delete a Plant with the specified id in the request
exports.deletePlant = (req, res) => {
  const id = req.query.id;

  Plant.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Plant with id=${id}. Maybe Plant was not found!`,
        });
      } else {
        res.send({
          message: "Plant was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Plant with id=" + id,
      });
    });
};

// Search plants by name
exports.searchPlants = async (req, res) => {
  if (!req.body.query) {
    res.status(400).send({ message: "Search bar cannot be empty!" });
    return;
  }

  const query = req.body.query;

  function hasWhiteSpace(query) {
    const whiteSpace = new RegExp(/\s/);
    return whiteSpace.test(query);
  }

  if (hasWhiteSpace(query)) {
    const queryStrings = query.split(" ");
    allQueries = [];
    queryStrings.forEach((element) => {
      allQueries.push({ name: { $regex: String(element), $options: "i" } });
    });
    const allPlants = await Plant.find({
      user_id: req.userId,
      $or: allQueries,
    });
    if (!allPlants || allPlants.length === 0) {
      res.status(400).send({ error: "No plants was found" });
    } else {
      res.status(200).send(allPlants);
    }
  } else {
    await Plant.find(
      {
        user_id: req.userId,
        name: { $regex: String(req.body.query), $options: "i" },
      },
      "name user_id",
      function (err, data) {
        if (err) {
          console.log(err);
        }
        if (!data || data.length === 0) {
          res.status(400).send({ message: "No plants was found" });
        } else {
          res.status(200).send(data);
        }
      }
    );
  }
};
