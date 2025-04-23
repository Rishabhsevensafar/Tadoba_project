import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "../styles/TourEnquiryModal.css";

const TourEnquiryModal = ({ show, handleClose, hotel, packageId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    hotelId: hotel?._id || "",
    packageId: packageId || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      hotelId: hotel?._id || "",
    }));
  }, [hotel]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/tour/tour-enquiry",
        formData
      );
      if (response.data.success) {
        setSuccessMessage("Your enquiry has been submitted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setSuccessMessage("Failed to send enquiry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="te-modal-wrapper">
      <Modal.Header closeButton className="te-modal-header">
        <Modal.Title className="te-modal-title">Enquire: {hotel?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="te-modal-body">
        <Form onSubmit={handleSubmit} className="te-form">
          <div className="te-group">
            <label className="te-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="te-input"
              required
              onChange={handleChange}
            />
          </div>

          <div className="te-group">
            <label className="te-label">Email</label>
            <input
              type="email"
              name="email"
              className="te-input"
              required
              onChange={handleChange}
            />
          </div>

          <div className="te-group">
            <label className="te-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="te-input"
              required
              onChange={handleChange}
            />
          </div>

          <div className="te-group">
            <label className="te-label">Country</label>
            <input
              type="text"
              name="country"
              className="te-input"
              required
              onChange={handleChange}
            />
          </div>

          <div className="te-group">
            <label className="te-label">Message</label>
            <textarea
              name="message"
              rows={3}
              className="te-textarea"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="te-submit-btn" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Enquiry"}
          </button>

          {successMessage && <p className="te-success-msg">{successMessage}</p>}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourEnquiryModal;
