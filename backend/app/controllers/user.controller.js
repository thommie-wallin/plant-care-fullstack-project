const db = require("../models");
// const User = db.user;
const User = require("../models/user.model");

//* Create and Save a new User
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body.username || !req.body.password) {
//     res.status(400).send({ message: "Content can not be empty!" });
//     return;
//   }

//   // Create a User
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//     admin: req.body.admin ? req.body.admin : false,
//   });

//   // Save User in the database
//   user
//     .save(user)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating the User.",
//       });
//     });
// };

//* Retrieve all Users from the database.
exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

//* Find a single User with an id
exports.getOneUser = (req, res) => {
  const id = req.body.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

//* Update a User by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!",
//     });
//   }

//   const id = req.params.id;

//   User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update User with id=${id}. Maybe User was not found!`,
//         });
//       } else res.send({ message: "User was updated successfully." });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating User with id=" + id,
//       });
//     });
// };

// Update a User by the id in the request
exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  // JWS-token-id
  // const id = req.userId;

  const id = req.body.id;

  User.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.body.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Testing Authorization

// /api/test/all for public access
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

// /api/test/user for loggedin users (any role)
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

// /api/test/admin for admin users
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

// /api/test/mod for moderator users
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
