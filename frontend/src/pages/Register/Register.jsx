import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(response.data.message);
      navigate("/login");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "customer",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      console.log(error);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <span className="auth-badge">🚀 Start Learning Today</span>
        <h1>Create Your Learning Account</h1>
        <p>
          Register as a customer to explore courses, enroll easily, and manage
          your learning journey.
        </p>

        <div className="auth-features">
          <div>✅ Simple course registration</div>
          <div>✅ Personal cart for your courses</div>
          <div>✅ Certificate after completion</div>
        </div>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p className="auth-subtitle">Customer registration only</p>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>

          <p className="auth-link-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;