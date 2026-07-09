
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleAdminLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      // Allow only admin login
      if (user.role !== "admin") {
        alert("Access denied. This page is only for Admin.");
        return;
      }

      // Save admin details
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));

      alert("Admin Login Successful");

      // Redirect directly to Users Dashboard
      navigate("/users");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Invalid Admin Email or Password"
      );
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <form className="admin-login-box" onSubmit={handleAdminLogin}>
          <h1>Admin Login</h1>

          <p>
            Only authorized administrators can access the SkillForge Academy
            Admin Dashboard.
          </p>

          <input
            type="email"
            placeholder="Enter Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login as Admin</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

