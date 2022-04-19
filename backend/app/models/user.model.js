// module.exports = (mongoose) => {
//   const User = mongoose.model(
//     "User",
//     mongoose.Schema(
//       {
//         username: String,
//         email: String,
//         password: String,
//         admin: Boolean,
//         roles: [
//           {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Role",
//           },
//         ],
//       },
//       { timestamps: true }
//     )
//   );

//   return User;
// };

const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
    },
    { timestamps: true }
  )
);
module.exports = User;

// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const User = new Schema({
//   username: String,
//   email: String,
//   password: String,
//   roles: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Role",
//     },
//   ],
// });
