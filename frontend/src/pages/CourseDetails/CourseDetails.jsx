import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetails.css";

function CourseDetails() {
  const { courseName } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const storageKey = `progress_${user?.email}_${courseName}`;
  const certificateKey = `certificates_${user?.email}`;

  const mediaFiles = [
    {
      id: 1,
      title: "Introduction Video",
      type: "Video",
      link: "https://www.youtube.com/watch?v=SqcY0GlETPk",
    },
    {
      id: 2,
      title: "React Components Video",
      type: "Video",
      link: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    },
    {
      id: 3,
      title: "React Notes",
      type: "PDF",
      link: "https://react.dev/learn",
    },
    {
      id: 4,
      title: "JavaScript Basics",
      type: "PDF",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      id: 5,
      title: "Assignment Document",
      type: "Document",
      link: "https://docs.google.com/document/u/0/",
    },
    {
      id: 6,
      title: "Project Task Document",
      type: "Document",
      link: "https://docs.google.com/document/u/0/",
    },
  ];

  const [completedItems, setCompletedItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    setCompletedItems(saved);
  }, [storageKey]);

  const handleOpenFile = (item) => {
    window.open(item.link, "_blank");

    if (!completedItems.includes(item.id)) {
      const updated = [...completedItems, item.id];
      setCompletedItems(updated);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }
  };

  const progress = Math.round((completedItems.length / mediaFiles.length) * 100);

  const downloadCertificate = () => {
    const certificateText = `
=========================================
          SKILLFORGE ACADEMY
=========================================

        CERTIFICATE OF COMPLETION

This is to certify that

        ${user?.name || "Student"}

has successfully completed the course

        ${courseName}

Course Progress: 100%
Completion Date: ${new Date().toLocaleDateString()}

Congratulations!

=========================================
`;

    const blob = new Blob([certificateText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${courseName}-certificate.txt`;
    a.click();

    URL.revokeObjectURL(url);

    const savedCertificates =
      JSON.parse(localStorage.getItem(certificateKey)) || [];

    const alreadyExists = savedCertificates.some(
      (cert) => cert.courseName === courseName
    );

    if (!alreadyExists) {
      const newCertificate = {
        courseName,
        studentName: user?.name || "Student",
        date: new Date().toLocaleDateString(),
        fileName: `${courseName}-certificate.txt`,
      };

      localStorage.setItem(
        certificateKey,
        JSON.stringify([...savedCertificates, newCertificate])
      );
    }
  };

  return (
    <div className="course-details-page">
      <div className="course-details-card">
        <h1>{courseName}</h1>

        <div className="course-info">
          <p><strong>Instructor:</strong> SkillForge Expert Trainer</p>
          <p><strong>Duration:</strong> 8 Weeks</p>
          <p><strong>Start Date:</strong> 25 June 2026</p>
        </div>

        <div className="progress-section">
          <h2>Course Progress</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="progress-text">{progress}% Completed</p>
        </div>

        <div className="media-section">
          <h2>Course Materials</h2>

          {mediaFiles.map((item) => (
            <div className="media-card" key={item.id}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.type}</p>
              </div>

              <button onClick={() => handleOpenFile(item)}>
                {completedItems.includes(item.id)
                  ? "Completed ✅"
                  : `Open ${item.type}`}
              </button>
            </div>
          ))}
        </div>

        <div className="certificate-section">
          <h2>Certificate Status</h2>

          {progress === 100 ? (
            <>
              <p className="certificate-ready">Certificate unlocked ✅</p>

              <button
                className="download-certificate-btn"
                onClick={downloadCertificate}
              >
                Download Certificate
              </button>
            </>
          ) : (
            <p className="certificate-pending">
              Complete all videos, PDFs and documents to unlock certificate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;