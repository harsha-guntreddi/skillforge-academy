import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "React Course",
      description: "Learn React from basics to advanced.",
      icon: "⚛️",
    },
    {
      id: 2,
      title: "JavaScript Course",
      description: "Master JavaScript programming.",
      icon: "🟨",
    },
    {
      id: 3,
      title: "Python Course",
      description: "Learn Python programming.",
      icon: "🐍",
    },
    {
      id: 4,
      title: "Node.js Course",
      description: "Build backend APIs with Node.js.",
      icon: "🟢",
    },
    {
      id: 5,
      title: "MongoDB Course",
      description: "Learn database management with MongoDB.",
      icon: "🍃",
    },
    {
      id: 6,
      title: "Full Stack Course",
      description: "Learn frontend, backend, and database.",
      icon: "💻",
    },
  ];

  function handleCourseClick(courseName) {
    navigate(`/course-register?course=${encodeURIComponent(courseName)}`);
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Welcome to SkillForge Academy Platform</h1>
        <p>Learn React, JavaScript,  Python And Many Easily.</p>
        <button onClick={() => navigate("/courses")}>Explore Courses</button>
      </section>

      <div className="search-box">
        <input type="text" placeholder="Search courses..." />
        <button>Search</button>
      </div>

      <section className="course-section">
        <h2>Popular Courses</h2>

        <div className="course-grid">
          {courses.map((course) => (
            <div
              className="course-card"
              key={course.id}
              onClick={() => handleCourseClick(course.title)}
            >
              <div className="course-icon">{course.icon}</div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button>Register Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;