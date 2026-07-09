const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    qualification: String,
    course: String,

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);