const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    mobile: {
      type: String,
      required: [true, "Please add your mobile number"],
      unique: [true, "Mobile number already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
