import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaShoppingCart,
  FaBookOpen,
  FaStar,
  FaCertificate,
  FaSignOutAlt,
  FaBell,
} from "react-icons/fa";
import axios from "axios";
import "./Profile1.css";

function Profile1() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("customerUser"));

  const [acceptedCourses, setAcceptedCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    async function fetchAcceptedCourses() {
      if (!user?.email) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/registrations/user/${user.email}`
        );

        const accepted = res.data.filter(
          (item) => item.status === "accepted"
        );

        setAcceptedCourses(accepted);
      } catch (error) {
        console.log(error);
      }
    }

    if (user?.email) {
      const savedCertificates =
        JSON.parse(localStorage.getItem(`certificates_${user.email}`)) || [];

      setCertificates(savedCertificates);
    }

    fetchAcceptedCourses();
  }, []);

  function handleLogout() {
    localStorage.removeItem("customerUser");
    localStorage.removeItem("customerToken");
    alert("Customer logout successful");
    navigate("/login");
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <FaUserCircle className="profile-main-icon" />
          <h2>Customer is not logged in</h2>
          <p>Please login as customer to view this profile.</p>

          <Link to="/login" className="login-btn">
            Customer Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-dashboard">
        <div className="profile-top">
          <FaUserCircle className="profile-main-icon" />
          <h1>{user.name}</h1>
          <span>Customer Account</span>
        </div>

        <div className="profile-info-grid">
          <div className="info-box">
            <FaEnvelope />
            <div>
              <small>Email</small>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="info-box">
            <FaUserTag />
            <div>
              <small>Role</small>
              <p>{user.role}</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <Link to="/cart" className="action-card">
            <FaShoppingCart />
            <span>My Cart</span>
          </Link>

          {acceptedCourses.length > 0 && (
            <Link to="/my-courses" className="action-card">
              <FaBookOpen />
              <span>My Courses</span>
            </Link>
          )}

          <Link to="/notifications" className="action-card">
            <FaBell />
            <span>Notifications</span>
          </Link>

          <Link to="/review" className="action-card">
            <FaStar />
            <span>Reviews</span>
          </Link>

          {certificates.length > 0 ? (
            <Link to="/certificates" className="action-card">
              <FaCertificate />
              <span>Certificates</span>
            </Link>
          ) : (
            <div className="action-card disabled-card">
              <FaCertificate />
              <span>Certificates</span>
            </div>
          )}
        </div>

        {certificates.length > 0 && (
          <div className="certificate-preview-section">
            <h3>Unlocked Certificates</h3>

            {certificates.map((cert, index) => (
              <div className="certificate-preview-card" key={index}>
                <FaCertificate />
                <div>
                  <h4>{cert.courseName}</h4>
                  <p>Completed on: {cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Customer Logout
        </button>
      </div>
    </div>
  );
}

export default Profile1;