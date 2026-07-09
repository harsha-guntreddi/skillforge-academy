const express = require("express");
const Notification = require("../models/Notification");

const router = express.Router();

// GET notifications by customer email
router.get("/:email", async (req, res) => {
  try {
    const notifications = await Notification.find({
      email: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error });
  }
});

// MARK all notifications as read
router.put("/read/:email", async (req, res) => {
  try {
    await Notification.updateMany(
      { email: req.params.email },
      { isRead: true }
    );

    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notifications", error });
  }
});

module.exports = router;