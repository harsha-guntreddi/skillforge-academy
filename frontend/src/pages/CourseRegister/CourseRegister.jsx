import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./CourseRegister.css";

function CourseRegister() {
  const [searchParams] = useSearchParams();
  const selectedCourse = searchParams.get("course");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
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
      await axios.post("http://localhost:5000/api/registrations", {
        ...formData,
        course: selectedCourse,
      });

      alert("Course registered successfully");

      setFormData({
        name: "",
        email: "",
        phone: "",
        qualification: "",
      });
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  }

  return (
    <div className="register-course-container">
      <form className="register-course-form" onSubmit={handleSubmit}>
        <h2>Register for {selectedCourse}</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="qualification"
          placeholder="Enter Qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />

        <button type="submit">Register Course</button>
      </form>
    </div>
  );
}

export default CourseRegister;
//fd