import React, { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import axios from "axios";

const HotelEnquiry = ({ hotelId }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/hotelenquiry", {
        ...values,
        hotelId,
      });

      message.success("Enquiry submitted successfully!");
      form.resetFields();
      handleClose();
    } catch (error) {
      console.error("Enquiry submission error:", error);
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpen}>
        Send Enquiry
      </Button>

      <Modal
        title="Hotel Enquiry"
        open={visible}
        onCancel={handleClose}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
              { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your enquiry..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit Enquiry
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default HotelEnquiry;
