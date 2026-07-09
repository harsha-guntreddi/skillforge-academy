const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "info",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);