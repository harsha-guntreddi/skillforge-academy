import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../socket";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    // Join the user's Socket.IO room
    socket.emit("joinUserRoom", user.email);

    // Load existing notifications from MongoDB
    fetchNotifications();

    // Listen for live notifications
    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  async function fetchNotifications() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/notifications/${user.email}`
      );

      setNotifications(response.data);

      await axios.put(
        `http://localhost:5000/api/notifications/read/${user.email}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  function getIcon(status) {
    switch (status) {
      case "accepted":
        return "✅";

      case "rejected":
        return "❌";

      case "revoked":
        return "🚫";

      default:
        return "🔔";
    }
  }

  return (
    <div className="notifications-page">
      <h1>Notifications</h1>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="notification-card">
            <div className="notification-icon">📭</div>

            <div>
              <h3>No Notifications</h3>
              <p>You don't have any notifications yet.</p>
            </div>
          </div>
        ) : (
          notifications.map((item) => (
            <div className="notification-card" key={item._id}>
              <div className="notification-icon">
                {getIcon(item.status)}
              </div>

              <div>
                <h3>{item.title}</h3>

                <p>{item.message}</p>

                <span>
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;