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
      // name: { type: [String], index: true },
      name: String,
      instruction: String,
      user_id: String,
    },
    { timestamps: true }
  )
);
// Plant.createIndexes({ name: "text" })
module.exports = Plant;
