import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./TourEnquiry.css"; // Add this CSS file to your project

const TourEnquiryModal = ({ show, handleClose, hotel, packageId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
    hotelId: hotel?._id || "", // ✅ Ensure hotel ID is passed
    packageId: packageId || "", // ✅ Ensure package ID is passed
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      hotelId: hotel?._id || "", // ✅ Update hotelId when hotel changes
    }));
  }, [hotel]);
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enquire: {hotel?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              required
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              name="country"
              required
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="message"
              required
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </Form.Group>

          <Button type="submit">Send Enquiry</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourEnquiryModal;
