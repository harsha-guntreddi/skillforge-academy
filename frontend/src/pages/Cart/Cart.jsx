import { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const [registrations, setRegistrations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email && user?.role !== "admin") {
      fetchRegistrations();
    }
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/registrations/user/${user.email}`
      );
      setRegistrations(res.data);
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  };

  const deleteRegistration = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/registrations/${id}`);
      alert("Registration deleted successfully");
      fetchRegistrations();
    } catch (error) {
      console.log("Error deleting registration:", error);
    }
  };

  function getStatusText(status) {
    if (status === "accepted") return "Accepted by Admin";
    if (status === "rejected") return "Rejected by Admin";
    return "Waiting for Admin Approval";
  }

  if (!user) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">Please login to view your cart</div>
        </div>
      </div>
    );
  }

  if (user?.role === "admin") {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            Cart is available only for customers.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>My Cart</h1>

        <div className="customer-box">
          <h2>Customer Details</h2>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>

        <h2 className="cart-section-title">Registered Courses</h2>

        {registrations.length === 0 ? (
          <div className="empty-cart">No courses registered yet.</div>
        ) : (
          <div className="cart-grid">
            {registrations.map((item) => (
              <div className="cart-card" key={item._id}>
                <h3>{item.course}</h3>

                <p><b>Name:</b> {item.name}</p>
                <p><b>Email:</b> {item.email}</p>
                <p><b>Phone:</b> {item.phone}</p>
                <p><b>Qualification:</b> {item.qualification}</p>

                <p>
                  <b>Status:</b>{" "}
                  <span className={`cart-status ${item.status || "pending"}`}>
                    {getStatusText(item.status)}
                  </span>
                </p>

                {item.status === "rejected" && (
                  <p className="reject-message">
                    Your course request was rejected by admin.
                  </p>
                )}

                {item.status === "accepted" && (
                  <p className="accept-message">
                    Your course request was accepted. Go to My Courses.
                  </p>
                )}

                <button onClick={() => deleteRegistration(item._id)}>
                  Delete Registration
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;