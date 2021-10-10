module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        username: String,
        password: String,
        admin: Boolean
      },
      { timestamps: true }
    )
  );

  return User;
};