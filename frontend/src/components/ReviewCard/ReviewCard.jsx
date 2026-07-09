import "./ReviewCard.css";

function ReviewCard({ review, currentUser, onDelete }) {
  return (
    <div className="review-card">
      <div className="review-top">
        <div>
          <h3>{review.userName}</h3>
          <span>{review.course}</span>
        </div>

        <div className="stars">
          {"⭐".repeat(review.rating)}
        </div>
      </div>

      <p>{review.review}</p>

      {(currentUser?.email === review.email || currentUser?.role === "admin") && (
        <button onClick={() => onDelete(review._id)}>Delete</button>
      )}
    </div>
  );
}

export default ReviewCard;