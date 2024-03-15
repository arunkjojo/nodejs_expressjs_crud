const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, "Please add Todo Label"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
