module.exports = mongoose => {
  const Plant = mongoose.model(
    "plant",
    mongoose.Schema(
      {
        name: String,
        instruction: String,
        user_id: String
      },
      { timestamps: true }
    )
  );

  return Plant;
};