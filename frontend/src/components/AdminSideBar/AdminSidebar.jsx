import { Link, useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaUsersCog,
  FaBookOpen,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("adminUser"));

  function handleLogout() {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    alert("Admin logout successful");
    navigate("/admin-login");
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        🎓 SkillForge
      </div>

      <div className="admin-sidebar-profile">
        <FaUserShield className="admin-sidebar-icon" />
        <h2>{admin?.name || "Admin"}</h2>
        <p>{admin?.email || "admin@skillforge.com"}</p>
      </div>

      <nav className="admin-sidebar-links">
        <Link to="/admin-profile">
          <FaUserShield /> Profile
        </Link>

        <Link to="/users">
          <FaUsersCog /> Manage Users
        </Link>

        <Link to="/courses">
          <FaBookOpen /> Courses
        </Link>

        <Link to="/">
          <FaHome /> Home
        </Link>
      </nav>

      <button className="admin-sidebar-logout" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;