import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );

      if (response.data.user.role === "admin") {
        alert("Admin cannot login here. Please use Admin Login page.");
        navigate("/admin-login");
        return;
      }

      localStorage.setItem("customerToken", response.data.token);
      localStorage.setItem("customerUser", JSON.stringify(response.data.user));

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      console.log(error);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <span className="auth-badge">🎓 Course Management System</span>
        <h1>Welcome Back, Learner!</h1>
        <p>
          Continue your learning journey, manage your courses, and track your
          registrations easily.
        </p>

        <div className="auth-features">
          <div>✅ Explore trending courses</div>
          <div>✅ Manage your registered courses</div>
          <div>✅ Learn anytime, anywhere</div>
        </div>
      </div>

      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Customer Login</h2>
          <p className="auth-subtitle">Access your student dashboard</p>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
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
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>

          <p className="auth-link-text">
            Admin? <Link to="/admin-login">Login here</Link>
          </p>

          <p className="auth-link-text">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;