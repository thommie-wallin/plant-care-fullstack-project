const db = require("../models");
const Plant = db.plants;

// Create and Save a new Plant
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.instruction) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Plant
  const plant = new Plant({
    name: req.body.name,
    instruction: req.body.instruction,
    user_id: req.body.user_id,
  });

  // Save Plant in the database
  plant
    .save(plant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Plant."
      });
    });
};

// Retrieve all Plant with user_id from the database.
exports.findAll = (req, res) => {
  const id = req.params.id;
  var condition = { user_id: id };

  Plant.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving plants."
      });
    });
};

// Find a single Plant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Plant.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Plant with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Plant with id=" + id });
    });
};

// Update a Plant by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Plant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plant with id=${id}. Maybe Plant was not found!`
        });
      } else res.send({ message: "Plant was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Plant with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Plant.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Plant with id=${id}. Maybe Plant was not found!`
        });
      } else {
        res.send({
          message: "Plant was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Plant with id=" + id
      });
    });
};