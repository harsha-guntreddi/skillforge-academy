const express = require("express");
const Registration = require("../models/Registeration");
const Notification = require("../models/Notification");

const router = express.Router();

async function createAndSendNotification(req, data) {
  const io = req.app.get("io");

  const notification = await Notification.create({
    email: data.email,
    title: data.title,
    message: data.message,
    course: data.course,
    status: data.status,
  });

  if (io) {
    io.to(data.email).emit("notification", notification);
  }

  return notification;
}

// CREATE - Course Registration
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, qualification, course } = req.body;

    const newRegistration = new Registration({
      name,
      email,
      phone,
      qualification,
      course,
      status: "pending",
    });

    await newRegistration.save();

    res.status(201).json({
      message: "Course registration request sent to admin",
      registration: newRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// READ - Get all registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// READ - Get registrations by customer email
router.get("/user/:email", async (req, res) => {
  try {
    const registrations = await Registration.find({
      email: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ACCEPT / REJECT request
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    let notificationTitle = "Registration Updated";
    let notificationMessage = `Your ${updatedRegistration.course} registration status is now ${status}.`;

    if (status === "accepted") {
      notificationTitle = "Course Approved";
      notificationMessage = `Congratulations! Your ${updatedRegistration.course} course registration has been approved.`;
    }

    if (status === "rejected") {
      notificationTitle = "Course Rejected";
      notificationMessage = `Sorry, your ${updatedRegistration.course} course registration has been rejected.`;
    }

    await createAndSendNotification(req, {
      email: updatedRegistration.email,
      title: notificationTitle,
      message: notificationMessage,
      course: updatedRegistration.course,
      status: updatedRegistration.status,
    });

    res.json({
      message: `Registration ${status} successfully`,
      registration: updatedRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// UPDATE registration
router.put("/:id", async (req, res) => {
  try {
    const oldRegistration = await Registration.findById(req.params.id);

    if (!oldRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (req.body.status && req.body.status !== oldRegistration.status) {
      let notificationTitle = "Registration Updated";
      let notificationMessage = `Your ${updatedRegistration.course} registration status is now ${updatedRegistration.status}.`;

      if (updatedRegistration.status === "accepted") {
        notificationTitle = "Course Approved";
        notificationMessage = `Congratulations! Your ${updatedRegistration.course} course registration has been approved.`;
      }

      if (updatedRegistration.status === "rejected") {
        notificationTitle = "Course Rejected";
        notificationMessage = `Sorry, your ${updatedRegistration.course} course registration has been rejected.`;
      }

      await createAndSendNotification(req, {
        email: updatedRegistration.email,
        title: notificationTitle,
        message: notificationMessage,
        course: updatedRegistration.course,
        status: updatedRegistration.status,
      });
    }

    res.json({
      message: "Registration updated successfully",
      registration: updatedRegistration,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE / REVOKE registration
router.delete("/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    await createAndSendNotification(req, {
      email: registration.email,
      title: "Course Access Revoked",
      message: `Your access to ${registration.course} has been revoked by admin.`,
      course: registration.course,
      status: "revoked",
    });

    await Registration.findByIdAndDelete(req.params.id);

    res.json({
      message: "Registration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;