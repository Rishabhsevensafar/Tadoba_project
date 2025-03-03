import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "./TourEnquiry.css"; // Add this CSS file to your project

const TourEnquiryModal = ({ show, handleClose, hotel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Add slight delay to show loading animation
    setTimeout(() => {
      onSubmit(formData);
      setIsLoading(false);
      handleClose();
    }, 800);
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      className="tour-enquiry-modal"
      backdrop="static"
    >
      <Modal.Header className="modal-header-custom">
        <Modal.Title className="w-100 text-center">Enquire: {hotel?.title}</Modal.Title>
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
          <Form.Group className="mb-3 form-group-animated">
            <Form.Label>Full Name</Form.Label>
            <div className="input-icon-wrapper">
              <Form.Control
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-control-custom"
              />
              <span className="input-icon">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </Form.Group>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3 form-group-animated">
                <Form.Label>Email</Form.Label>
                <div className="input-icon-wrapper">
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="form-control-custom"
                  />
                  <span className="input-icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3 form-group-animated">
                <Form.Label>Phone</Form.Label>
                <div className="input-icon-wrapper">
                  <Form.Control
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="form-control-custom"
                  />
                  <span className="input-icon">
                    <i className="fas fa-phone"></i>
                  </span>
                </div>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3 form-group-animated">
            <Form.Label>Country</Form.Label>
            <div className="input-icon-wrapper">
              <Form.Control
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                placeholder="Your country"
                className="form-control-custom"
              />
              <span className="input-icon">
                <i className="fas fa-globe"></i>
              </span>
            </div>
          </Form.Group>
          
          <Form.Group className="mb-4 form-group-animated">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={3}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
              className="form-control-custom"
            />
          </Form.Group>
          
          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 submit-button-animated"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sending...
              </>
            ) : (
              'Send Enquiry'
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TourEnquiryModal;