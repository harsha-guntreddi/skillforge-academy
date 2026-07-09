import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyCourses.css";

function MyCourses() {
  const [acceptedCourses, setAcceptedCourses] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    async function fetchAcceptedCourses() {
      if (!user?.email) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/registrations/user/${user.email}`
        );

        const accepted = res.data.filter(
          (course) => course.status === "accepted"
        );

        setAcceptedCourses(accepted);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAcceptedCourses();
  }, [user?.email]);

  const getCourseProgress = (courseName) => {
    const saved =
      JSON.parse(localStorage.getItem(`progress_${user.email}_${courseName}`)) ||
      [];

    return Math.round((saved.length / 6) * 100);
  };

  return (
    <div className="my-courses-page">
      <h1 className="my-courses-title">My Courses</h1>

      {acceptedCourses.length === 0 ? (
        <p className="empty-message">No accepted courses yet.</p>
      ) : (
        <div className="my-courses-container">
          {acceptedCourses.map((course) => {
            const progress = getCourseProgress(course.course);

            return (
              <div className="my-course-card" key={course._id}>
                <span className="course-status">Accepted</span>

                <h2>{course.course}</h2>

                <p><strong>Instructor:</strong> Suresh Kumar</p>
                <p><strong>Duration:</strong> 45 Days</p>
                <p><strong>Start Date:</strong> 25 June 2026</p>
                <p><strong>Mode:</strong> Online</p>
                <p><strong>Class Time:</strong> 7 PM - 8 PM</p>

                <p>
                  <strong>Certificate:</strong>{" "}
                  {progress === 100
                    ? "Certificate Unlocked ✅"
                    : "Locked until course completion"}
                </p>

                <div className="course-material-buttons">
                  <button>📄 PDF Notes</button>
                  <button>🎥 Video Lectures</button>
                  <button>📝 Assignments</button>
                </div>

                <div className="my-progress-bar">
                  <div
                    className="my-progress-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="my-progress-text">Progress: {progress}%</p>

                <button
                  className="view-details-btn"
                  onClick={() => navigate(`/course-details/${course.course}`)}
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyCourses;