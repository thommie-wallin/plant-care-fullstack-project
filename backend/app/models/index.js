const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose);
db.role = require("./role.model")(mongoose);
db.ROLES = ["user", "admin", "moderator"];
db.plants = require("./plant.model.js")(mongoose);

module.exports = db;
