// module.exports = (mongoose) => {
//   const Plant = mongoose.model(
//     "Plant",
//     mongoose.Schema(
//       {
//         name: String,
//         instruction: String,
//         user_id: String,
//       },
//       { timestamps: true }
//     )
//   );

//   return Plant;
// };

const mongoose = require("mongoose");
const Plant = mongoose.model(
  "Plant",
  new mongoose.Schema(
    {
      name: String,
      instruction: String,
      user_id: String,
    },
    { timestamps: true }
  )
);
module.exports = Plant;
