import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message, Row, Col } from "antd";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const ManualHotelEnquiryModal = ({
  visible,
  onCancel,
  refreshEnquiries,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [fetchingHotels, setFetchingHotels] = useState(false);

  // Moved console.log after hotels is initialized
  console.log("Hotels data:", hotels);

  // Fetch hotels when modal opens
  useEffect(() => {
    if (visible) {
      fetchHotels();
    }
  }, [visible]);

  const fetchHotels = async () => {
    try {
      setFetchingHotels(true);
      const response = await axios.get('http://localhost:5000/api/hotel/hotels-dropdown', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      if (response.data.success) {
        setHotels(response.data.hotels);
      }
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to load hotels');
    } finally {
      setFetchingHotels(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const enquiryData = {
        ...values,
        status: "pending",
        isManual: true,
      };

      const response = await axios.post(
        "http://localhost:5000/api/hotelenquiry/manual",
        enquiryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (response.data.success) {
        message.success("Hotel enquiry created successfully!");
        form.resetFields();
        refreshEnquiries();
        onCancel();
      }
    } catch (error) {
      console.error("Error creating manual hotel enquiry:", error);
      message.error(error.response?.data?.error || "Failed to create enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Manual Hotel Enquiry"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={loading}
          onClick={handleSubmit}
          disabled={fetchingHotels || hotels.length === 0}
        >
          {fetchingHotels ? 'Loading Hotels...' : 'Create Enquiry'}
        </Button>,
      ]}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Customer Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Enter customer name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ type: "email", message: "Please enter valid email" }]}
            >
              <Input placeholder="Enter email (optional)" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hotelId"
              label="Hotel"
              rules={[{ required: true, message: 'Please select hotel' }]}
            >
              <Select
                placeholder={fetchingHotels ? 'Loading hotels...' : 'Select hotel'}
                loading={fetchingHotels}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {hotels.map(hotel => (
                  <Option key={hotel._id} value={hotel._id}>
                    {hotel.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="message" label="Message/Requirements">
          <TextArea
            rows={3}
            placeholder="Enter customer requirements or message"
          />
        </Form.Item>

        <Form.Item name="remark" label="Admin Remark">
          <TextArea rows={2} placeholder="Enter any internal remarks" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ManualHotelEnquiryModal;