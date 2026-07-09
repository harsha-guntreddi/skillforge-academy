import "./About.css";

function About() {
  const features = [
    {
      icon: "🎓",
      title: "Course Registration",
      desc: "Students can easily explore and register for their favorite courses.",
    },
    {
      icon: "📜",
      title: "Certificate After Completion",
      desc: "Students receive a course completion certificate after successfully finishing the course.",
    },
    {
      icon: "🛒",
      title: "Personal Cart",
      desc: "Customers can view their registered courses and delete registrations from their cart.",
    },
    {
      icon: "👨‍💼",
      title: "Admin Dashboard",
      desc: "Admin can view, update, and delete all customer course registrations.",
    },
    {
      icon: "🔐",
      title: "Secure Login System",
      desc: "Separate login access for customers and admins with role-based navigation.",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      desc: "Works smoothly on mobile, tablet, and desktop screens.",
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About Our Course Management System</h1>
        <p>
          A modern learning platform where students can explore courses,
          register easily, manage their courses, and receive certificates.
        </p>
      </section>

      <section className="features-section">
        <h2>Our Features</h2>

        <div className="features-grid">
          {features.map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;