import { useNavigate } from "react-router-dom";
import "./Courses.css";

function Courses() {
  const navigate = useNavigate();

  const courses = [
    {
      title: "React Course",
      description: "Learn components, hooks, routing, and state management.",
      image: "⚛️",
      price: "₹999",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      title: "JavaScript Course",
      description: "Master ES6, DOM, functions, arrays, and objects.",
      image: "🟨",
      price: "₹799",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      title: "Python Course",
      description: "Learn Python basics, logic building, and projects.",
      image: "🐍",
      price: "₹899",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      title: "Node.js Course",
      description: "Build backend APIs using Node.js and Express.",
      image: "🟢",
      price: "₹1099",
      rating: "⭐⭐⭐⭐",
    },
    {
      title: "MongoDB Course",
      description: "Learn database design, CRUD, and MongoDB Atlas.",
      image: "🍃",
      price: "₹699",
      rating: "⭐⭐⭐⭐",
    },
    {
      title: "MERN Stack Course",
      description: "Build full stack projects using MongoDB, Express, React, Node.",
      image: "💻",
      price: "₹2499",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      title: "Java Course",
      description: "Learn OOP, collections, exception handling, and JDBC.",
      image: "☕",
      price: "₹1199",
      rating: "⭐⭐⭐⭐",
    },
    {
      title: "AI & Machine Learning",
      description: "Understand ML models, data preprocessing, and predictions.",
      image: "🧠",
      price: "₹2999",
      rating: "⭐⭐⭐⭐⭐",
    },
    {
      title: "React Native",
      description: "Create Android and iOS mobile apps using React Native.",
      image: "📱",
      price: "₹1499",
      rating: "⭐⭐⭐⭐",
    },
    {
      title: "AWS Cloud",
      description: "Learn cloud basics, EC2, S3, hosting, and deployment.",
      image: "☁️",
      price: "₹1999",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  function registerCourse(courseName) {
    navigate(`/course-register?course=${encodeURIComponent(courseName)}`);
  }

  return (
    <div className="courses-page">
      <div className="courses-hero">
        <h1>Explore Our Courses</h1>
        <p>Choose your course and start learning today</p>
      </div>

      <div className="courses-grid">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <div className="course-image">{course.image}</div>

            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              <div className="course-rating">{course.rating}</div>

              <div className="course-bottom">
                <span className="course-price">{course.price}</span>

                <button onClick={() => registerCourse(course.title)}>
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;