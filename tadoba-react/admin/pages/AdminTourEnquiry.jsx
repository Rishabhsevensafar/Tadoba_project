import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const AdminTourEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tour/tour-enquiries");
      setEnquiries(response.data.enquiries);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  };

  const handleOpenModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setRemark(enquiry.remark || "");
    setStatus(enquiry.status);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleUpdateEnquiry = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tour/tour-enquiry/${selectedEnquiry._id}`, { status, remark });
      alert("Enquiry updated successfully!");
      fetchEnquiries();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating enquiry:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Tour Enquiries</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hotel</th>
            <th>Package</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Message</th>
            <th>Status</th>
            <th>Remark</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry._id}>
              <td>{enquiry.name}</td>
              <td>{enquiry.hotel?.title || "N/A"}</td>  {/* ✅ Show Hotel Name */}
              <td>{enquiry.package?.title || "N/A"}</td> {/* ✅ Show Package Name */}
              <td>{enquiry.email}</td>
              <td>{enquiry.phone}</td>
              <td>{enquiry.country}</td>
              <td>{enquiry.message}</td>
              <td>
                <span className={enquiry.status === "Pending" ? "text-danger" : "text-success"}>
                  {enquiry.status}
                </span>
              </td>
              <td>{enquiry.remark || "No Remark"}</td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleOpenModal(enquiry)}>
                  Add Remark
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Remark & Status Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Enquiry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Remark</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter remark"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateEnquiry}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminTourEnquiries;
