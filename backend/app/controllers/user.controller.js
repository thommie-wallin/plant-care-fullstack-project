const db = require("../models");
const User = db.user;
const Role = db.role;
const Plant = db.plants;

// Retrieve all Users from the database.
exports.getUsers = (req, res) => {
  User.find({})
    .populate("roles", "-__v")
    .exec((err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!users) {
        return res.status(404).send({ message: "Users Not found." });
      }

      // Exchange role id for role name in object
      const newUsers = users.map((element) => {
        let authorities = [];
        for (let i = 0; i < element.roles.length; i++) {
          authorities.push(element.roles[i].name);
        }
        Object.keys(element).forEach(function (key) {
          element[key].roles = authorities;
        });
        return element;
      });
      res.status(200).send(newUsers);
    });
};

// Find a single User with an id
exports.getOneUser = (req, res) => {
  const id = req.query.id;

  User.findById(id)
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      let authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name);
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        password: user.password,
        email: user.email,
        roles: authorities,
      });
    });
};

// Update a User by the id in the request
exports.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.body.id;

  const updatedUser = {
    username: req.body.username,
    email: req.body.email,
  };

  Role.find(
    {
      name: { $in: req.body.roles },
    },
    (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      updatedUser.roles = roles.map((role) => role._id);

      User.findByIdAndUpdate(id, updatedUser)
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
            err,
          });
        });
    }
  );
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.query.id;

  Plant.deleteMany({ user_id: `${id}` })
    .then(function () {
      console.log("Plants deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });

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
