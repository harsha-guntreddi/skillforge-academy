import { Link, useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaEnvelope,
  FaUserTag,
  FaUsersCog,
  FaBookOpen,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import "./AdminProfile.css";

function AdminProfile() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("adminUser"));

  function handleLogout() {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    alert("Admin logout successful");
    navigate("/admin-login");
  }

  if (!admin) {
    return (
      <div className="admin-profile-page">
        <div className="admin-profile-card">
          <h2>Admin is not logged in</h2>
          <p>Please login as admin to view this profile.</p>

          <Link to="/admin-login" className="admin-profile-btn">
            Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-profile-page">
      <div className="admin-profile-card">
        <div className="admin-profile-header">
          <FaUserShield className="admin-profile-icon" />
          <h1>{admin.name}</h1>
          <span>Administrator</span>
        </div>

        <div className="admin-info-box">
          <FaEnvelope />
          <div>
            <small>Admin Email</small>
            <p>{admin.email}</p>
          </div>
        </div>

        <div className="admin-info-box">
          <FaUserTag />
          <div>
            <small>Role</small>
            <p>{admin.role}</p>
          </div>
        </div>

        <div className="admin-actions">
          <Link to="/users" className="admin-action-card">
            <FaUsersCog />
            <span>Manage Users</span>
          </Link>

          <Link to="/courses" className="admin-action-card">
            <FaBookOpen />
            <span>View Courses</span>
          </Link>

          <Link to="/" className="admin-action-card">
            <FaHome />
            <span>Home</span>
          </Link>
        </div>

        <button onClick={handleLogout} className="admin-logout-btn">
          <FaSignOutAlt /> Admin Logout
        </button>
      </div>
    </div>
  );
}

export default AdminProfile;