import React, { useState } from "react";
import axios from "axios";
import "../styles/GeneralEnquiry.css"

const FloatingEnquiry = () => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    location: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5001/api/general/submit-enquiry", formData);
      alert("Enquiry submitted successfully!");
      setFormData({ name: "", email: "", phone: "", enquiryType: "", location: "", message: "" });
      setVisible(false);
    } catch (err) {
      alert("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="floating-btn" onClick={() => setVisible(true)}>✉️ Enquiry</button>

      {visible && (
        <div className="enquiry-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setVisible(false)}>×</button>
            <h3>Submit Your Enquiry</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
              <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
              <select name="enquiryType" required onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Tour">Tours & Packages</option>
                <option value="Hotel">Hotels</option>
                <option value="Safari">Safari</option>
              </select>
              <input type="text" name="location" placeholder="Current Location" required onChange={handleChange} />
              <textarea name="message" placeholder="Write your message" rows="4" required onChange={handleChange}></textarea>
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingEnquiry;
