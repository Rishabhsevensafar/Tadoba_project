import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./TourEnquiry.css"; // Add this CSS file to your project

const TourEnquiryModal = ({ show, handleClose, hotel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    hotelId: hotel?._id || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/tour/tour-enquiry", formData);
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
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      backdrop="static"
      className="tour-enquiry-modal"
    >
      <Modal.Header className="modal-header-custom">
        <Modal.Title className="w-100 text-center">
          Enquire About: {hotel?.title}
        </Modal.Title>
        <Button 
          variant="link" 
          onClick={handleClose} 
          className="close-button"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </Button>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              placeholder="Your country"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={3}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
            />
          </Form.Group>

          {successMessage && <p className="text-success">{successMessage}</p>}

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Enquiry"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourEnquiryModal;
