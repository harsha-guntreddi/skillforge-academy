import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any questions you may have.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+91 9876543210</p>
          </div>

          <div className="info-card">
            <h3>📧 Email</h3>
            <p>support@skillforgeacademy.com</p>
          </div>

          <div className="info-card">
            <h3>📍 Location</h3>
            <p>Hyderabad, India</p>
          </div>
        </div>

        <form className="contact-form">
          <h2>Send Message</h2>

          <input type="text" placeholder="Your Name" required />

          <input type="email" placeholder="Your Email" required />

          <textarea
            rows="5"
            placeholder="Write your message..."
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;