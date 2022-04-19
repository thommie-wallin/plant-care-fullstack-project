// module.exports = (mongoose) => {
//   const Role = mongoose.model(
//     "Role",
//     mongoose.Schema(
//       {
//         name: String,
//       },
//       { timestamps: true }
//     )
//   );

//   return Role;
// };

const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
  })
);
module.exports = Role;
