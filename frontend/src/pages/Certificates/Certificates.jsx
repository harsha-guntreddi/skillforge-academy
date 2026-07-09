import { useEffect, useState } from "react";
import "./Certificates.css";

function Certificates() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(`certificates_${user?.email}`)) || [];

    setCertificates(saved);
  }, [user?.email]);

  return (
    <div className="certificates-page">
      <h1>My Certificates</h1>

      {certificates.length === 0 ? (
        <p className="no-certificates">No certificates unlocked yet.</p>
      ) : (
        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <div className="certificate-card" key={index}>
              <h2>{cert.courseName}</h2>
              <p>Student: {cert.studentName}</p>
              <p>Completed on: {cert.date}</p>
              <p>Status: Certificate Unlocked ✅</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Certificates;