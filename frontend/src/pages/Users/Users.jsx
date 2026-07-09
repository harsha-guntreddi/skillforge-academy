import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import axios from "axios";
import "./Users.css";

function Users() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    course: "",
  });

  useEffect(() => {
    const adminUser = JSON.parse(localStorage.getItem("adminUser"));
    const normalUser = JSON.parse(localStorage.getItem("user"));

    const loggedAdmin =
      adminUser?.role === "admin" || normalUser?.role === "admin";

    if (!loggedAdmin) {
      navigate("/admin-login");
      return;
    }

    fetchRegistrations();
  }, [navigate]);

  const totalUsers = registrations.length;
  const pendingUsers = registrations.filter((user) => user.status === "pending").length;
  const acceptedUsers = registrations.filter((user) => user.status === "accepted").length;
  const rejectedUsers = registrations.filter((user) => user.status === "rejected").length;

  const filteredRegistrations = registrations.filter((registration) => {
    const searchValue = searchText.toLowerCase();

    const matchesSearch =
      registration.name?.toLowerCase().includes(searchValue) ||
      registration.email?.toLowerCase().includes(searchValue) ||
      registration.course?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "all" || registration.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  async function fetchRegistrations() {
    try {
      const response = await axios.get("http://localhost:5000/api/registrations");
      setRegistrations(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch registrations");
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/registrations/${editId}`,
          formData
        );
        alert("Registration updated successfully");
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/registrations", formData);
        alert("Registration added successfully");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        qualification: "",
        course: "",
      });

      fetchRegistrations();
    } catch (error) {
      console.log(error);
      alert("Failed to save registration");
    }
  }

  function handleEdit(registration) {
    setEditId(registration._id);

    setFormData({
      name: registration.name,
      email: registration.email,
      phone: registration.phone,
      qualification: registration.qualification,
      course: registration.course,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this registration?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/registrations/${id}`);
      alert("Registration deleted successfully");
      fetchRegistrations();
    } catch (error) {
      console.log(error);
      alert("Failed to delete registration");
    }
  }

  async function updateStatus(id, status) {
    try {
      await axios.put(`http://localhost:5000/api/registrations/${id}`, {
        status,
      });

      fetchRegistrations();
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  }

  async function revokeCourse(id) {
    if (!window.confirm("Are you sure you want to revoke this course access?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/registrations/${id}`);
      alert("Course access revoked successfully");
      fetchRegistrations();
    } catch (error) {
      console.log(error);
      alert("Failed to revoke course access");
    }
  }

  return (
    <>
      <AdminSidebar />

      <main className="admin-main-content">
        <div className="users-page">
          <div className="users-container">
            <div className="dashboard-header">
              <h1>SkillForge Admin Dashboard</h1>
              <p>Manage customer registrations, approvals, and course access</p>
            </div>

            <div className="dashboard-cards">
              <div className="dashboard-card total">
                <span>👥</span>
                <h3>Total Users</h3>
                <h2>{totalUsers}</h2>
              </div>

              <div className="dashboard-card pending">
                <span>⏳</span>
                <h3>Pending</h3>
                <h2>{pendingUsers}</h2>
              </div>

              <div className="dashboard-card accepted">
                <span>✅</span>
                <h3>Accepted</h3>
                <h2>{acceptedUsers}</h2>
              </div>

              <div className="dashboard-card rejected">
                <span>❌</span>
                <h3>Rejected</h3>
                <h2>{rejectedUsers}</h2>
              </div>
            </div>

            <form className="user-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Enter phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="qualification"
                placeholder="Enter qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="course"
                placeholder="Enter course"
                value={formData.course}
                onChange={handleChange}
                required
              />

              <button type="submit">
                {editId ? "Update Registration" : "Add Registration"}
              </button>
            </form>

            <div className="toolbar">
              <div className="search-box">
                <span>🔍</span>
                <input
                  type="text"
                  placeholder="Search by name, email, or course..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <select
                className="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="table-summary">
              Showing {filteredRegistrations.length} of {registrations.length} registrations
            </div>

            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Qualification</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Access Control</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan="8">No matching registrations found</td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((registration) => (
                      <tr key={registration._id}>
                        <td>{registration.name}</td>
                        <td>{registration.email}</td>
                        <td>{registration.phone}</td>
                        <td>{registration.qualification}</td>
                        <td>{registration.course}</td>

                        <td>
                          <span className={`status-badge ${registration.status}`}>
                            {registration.status || "pending"}
                          </span>
                        </td>

                        <td>
                          {registration.status === "accepted" ? (
                            <button
                              className="revoke-btn"
                              onClick={() => revokeCourse(registration._id)}
                            >
                              Revoke
                            </button>
                          ) : (
                            <>
                              <button
                                className="accept-btn"
                                onClick={() =>
                                  updateStatus(registration._id, "accepted")
                                }
                              >
                                Accept
                              </button>

                              <button
                                className="reject-btn"
                                onClick={() =>
                                  updateStatus(registration._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>

                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(registration)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(registration._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Users;
//hi