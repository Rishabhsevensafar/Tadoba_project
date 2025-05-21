import React, { useState } from "react";
import axios from "axios";
import "../styles/HotelEnquiryModal.css"; // Adjust the path as necessary

const HotelEnquiry = ({ hotelId }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Please fill all fields");
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5001/api/hotelenquiry", {
        ...formData,
        hotelId,
      });
      alert("Enquiry submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      handleClose();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit enquiry. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="hf-btn-enquiry">
        Send Enquiry
      </button>

      {visible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleClose}>
              &times;
            </button>
            <h2 className="modal-title">Hotel Enquiry</h2>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (10 digits)"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Write your enquiry..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`submit-btn ${loading ? "disabled" : ""}`}
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelEnquiry;
