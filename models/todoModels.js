const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
