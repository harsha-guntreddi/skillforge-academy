import "./Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-img">H</div>

        <h2>Harsha Vardhan</h2>
        <p>Frontend React Developer</p>

        <div className="profile-info">
          <p><strong>Email:</strong> harsha@example.com</p>
          <p><strong>Skills:</strong> React, JavaScript, HTML, CSS</p>
          <p><strong>Project:</strong> My Learning Platform</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;