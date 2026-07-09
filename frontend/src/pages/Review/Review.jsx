import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import "./Review.css";

function Review() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    rating: "",
    review: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("Please login to add review");
      return;
    }

    try {
      const reviewData = {
        userName: user.name,
        email: user.email,
        course: formData.course,
        rating: formData.rating,
        review: formData.review,
      };

      const res = await axios.post(
        "http://localhost:5000/api/reviews",
        reviewData
      );

      alert(res.data.message);

      setFormData({
        course: "",
        rating: "",
        review: "",
      });

      fetchReviews();
    } catch (error) {
      alert("Review failed");
      console.log(error);
    }
  }

  async function deleteReview(id) {
    const confirmDelete = window.confirm("Delete this review?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      alert("Review deleted");
      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="review-page">
      <section className="review-hero">
        <h1>Course Reviews</h1>
        <p>Share your learning experience with other students</p>
      </section>

      <div className="review-container">
        <form className="review-form" onSubmit={handleSubmit}>
          <h2>Write a Review</h2>

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="React Course">React Course</option>
            <option value="JavaScript Course">JavaScript Course</option>
            <option value="Python Course">Python Course</option>
            <option value="Node.js Course">Node.js Course</option>
            <option value="MongoDB Course">MongoDB Course</option>
            <option value="MERN Stack Course">MERN Stack Course</option>
            <option value="Java Course">Java Course</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="React Native">React Native</option>
            <option value="AWS Cloud">AWS Cloud</option>
          </select>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="5">⭐⭐⭐⭐⭐ 5</option>
            <option value="4">⭐⭐⭐⭐ 4</option>
            <option value="3">⭐⭐⭐ 3</option>
            <option value="2">⭐⭐ 2</option>
            <option value="1">⭐ 1</option>
          </select>

          <textarea
            name="review"
            placeholder="Write your review..."
            value={formData.review}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit Review</button>
        </form>

        <div className="reviews-list">
          <h2>Student Reviews</h2>

          {reviews.length === 0 ? (
            <p className="no-review">No reviews yet.</p>
          ) : (
            reviews.map((item) => (
              <ReviewCard
                key={item._id}
                review={item}
                currentUser={user}
                onDelete={deleteReview}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Review;