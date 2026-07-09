import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
        🎓 SkillForge Academy
      </Link>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={menuOpen ? "navbar-links active" : "navbar-links"}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About
        </Link>

        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>

        <Link to="/review" onClick={() => setMenuOpen(false)}>
          Review
        </Link>

        <Link to="/login" onClick={() => setMenuOpen(false)}>
          Customer Login
        </Link>

        <Link to="/register" onClick={() => setMenuOpen(false)}>
          Register
        </Link>

        <Link to="/admin-login" onClick={() => setMenuOpen(false)}>
          Admin Login
        </Link>

        <Link
          to="/profile1"
          className="profile-icon"
          title="Customer Profile"
          onClick={() => setMenuOpen(false)}
        >
          <FaUserCircle />
        </Link>

        
        
      </div>
    </nav>
  );
}

export default Navbar;