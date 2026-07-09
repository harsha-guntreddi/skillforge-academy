import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <h1>Welcome to SkillForge Academy Platform</h1>
      <p>Learn React, JavaScript And Python And More Easily.</p>

      <Link to="/courses">
        <button>Explore Courses</button>
      </Link>
    </section>
  );
}

export default HeroSection;