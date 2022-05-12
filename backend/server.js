require("dotenv").config();
const express = require("express");
const dbConfig = require("./app/config/db.config");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "*",
  // origin: "http://localhost:8081",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "x-access-token"],
  exposedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

// parse requests of content-type - application / json
app.use(express.json());

// parse requests of content-type - application / x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Open Mongoose connection to MongoDB database
const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect(
    `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    console.log(dbConfig.username);
    process.exit();
  });

// initial() function helps us to create 3 important rows in roles collection.
function initial() {
  Role.collection.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: " Welcome to this test application. " });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/plant.routes")(app);

// set port , listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
