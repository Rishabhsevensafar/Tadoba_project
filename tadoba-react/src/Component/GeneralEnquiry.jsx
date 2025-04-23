import React, { useState } from "react";
import axios from "axios";

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
      await axios.post("http://localhost:5000/api/general/submit-enquiry", formData);
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

      <style jsx>{`
        .floating-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #2c5f2d;
          color: #fff;
          border: none;
          padding: 12px 20px;
          border-radius: 50px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          z-index: 999;
        }
        .enquiry-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 25px;
          border-radius: 8px;
          width: 90%;
          max-width: 450px;
          position: relative;
        }
        .modal-content h3 {
          margin-bottom: 20px;
        }
        .modal-content input,
        .modal-content select,
        .modal-content textarea {
          width: 100%;
          margin-bottom: 12px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .modal-content button[type="submit"] {
          background-color: #2c5f2d;
          color: white;
          border: none;
          padding: 10px;
          width: 100%;
          border-radius: 4px;
          cursor: pointer;
        }
        .close-btn {
          position: absolute;
          top: 8px;
          right: 12px;
          background: transparent;
          border: none;
          font-size: 22px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default FloatingEnquiry;
