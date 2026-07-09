const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// CREATE REVIEW
router.post("/", async (req, res) => {
  try {
    const { userName, email, course, rating, review } = req.body;

    const newReview = new Review({
      userName,
      email,
      course,
      rating,
      review,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET REVIEWS BY COURSE
router.get("/course/:course", async (req, res) => {
  try {
    const reviews = await Review.find({
      course: req.params.course,
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE REVIEW
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;