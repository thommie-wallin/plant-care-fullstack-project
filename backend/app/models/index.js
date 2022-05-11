const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js");
db.role = require("./role.model");
db.ROLES = ["user", "admin"];
db.plants = require("./plant.model.js");

module.exports = db;
