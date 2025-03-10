import React, { useState, useEffect } from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import contactBanner from "../../assets/images/contact-banner.jpg";

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/contactenquiry/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div>
        <img src={contactBanner} alt="Contact page banner" />
      </div>
      <section className="leaf">
        <div className="container">
          <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="addressBox">
                <h5>Branch Office</h5>
                <p>
                  15/8, Block -15, Near <br />
                  Exide Battery, Geeta Colony, <br />
                  East Delhi, New Delhi - 110031
                </p>
                <h6>Email</h6>
                <p>contact@tadobanationalparkonline.in </p>
                <h6>Registered Office-</h6>
                <p>
                  15/8, Block -15, Near Battery, Geeta Colony, East Delhi, New
                  Delhi - 110031
                </p>
                <h6>Phone-</h6>
                <p>+91-7982653974</p>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Contact Us</h4>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="contactInput"
                placeholder="Enter Your Name"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                className="contactInput"
                placeholder="Enter Your Email"
                onChange={handleChange}
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                className="contactInput"
                placeholder="Enter Your Number"
                onChange={handleChange}
              />
              <textarea
                name="message"
                value={formData.message}
                className="contactarea"
                placeholder="Enter Your Message"
                onChange={handleChange}
              />
              <button type="button" className="btn btn-primary contactInput" onClick={handleSubmit} disabled={loading}>
                {loading ? "Sending..." : "Send Now"}
              </button>
            </div>
          </div>
        </div>
      </section>
      <ImportantLinks />
      <Footer />
    </>
  );
}

export default ContactUs;
