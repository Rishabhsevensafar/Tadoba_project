import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, message, Row, Col } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const ManualEnquiryModal = ({ visible, onCancel, refreshEnquiries }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const safariZones = [
    'Moharli/Mamla/Agarzari/Adegaon/Junona/Devada',
    'Kolara/Alizanza/Madnapur/Palasgaon/Shirkheda Belara',
    'Navegaon/Ramdegi/Nimdela',
    'Kesalaghat/Pangadi/Pangadi Aswal Chuha/Zari Peth'
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const enquiryData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        children: values.children || 0,
        status: 'Pending',
        isManual: true
      };

      const response = await axios.post('http://localhost:5001/api/safarienquiry/manual', enquiryData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (response.data.success) {
        message.success('Enquiry created successfully!');
        form.resetFields();
        refreshEnquiries();
        onCancel();
      }
    } catch (error) {
      console.error('Error creating manual enquiry:', error);
      message.error(error.response?.data?.error || 'Failed to create enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Manual Enquiry"
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
        >
          Create Enquiry
        </Button>,
      ]}
      width={800}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input placeholder="Enter customer name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
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
              rules={[{ type: 'email', message: 'Please enter valid email' }]}
            >
              <Input placeholder="Enter email (optional)" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="date"
              label="Safari Date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker 
                style={{ width: '100%' }} 
                disabledDate={(current) => current && current < moment().startOf('day')} 
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="safariZone"
              label="Safari Zone"
              rules={[{ required: true, message: 'Please select zone' }]}
            >
              <Select placeholder="Select safari zone">
                {safariZones.map(zone => (
                  <Option key={zone} value={zone}>{zone}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="vehicleType"
              label="Vehicle Type"
              rules={[{ required: true, message: 'Please select vehicle type' }]}
            >
              <Select placeholder="Select vehicle type">
                <Option value="Jeep">Jeep</Option>
                <Option value="Canter">Canter</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="safariTime"
              label="Safari Time"
              rules={[{ required: true, message: 'Please select time' }]}
            >
              <Select placeholder="Select safari time">
                <Option value="Morning">Morning</Option>
                <Option value="Evening">Evening</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="adults"
              label="Adults"
              initialValue={1}
              rules={[{ required: true, message: 'Please enter number of adults' }]}
            >
              <Input type="number" min={1} max={10} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="children"
              label="Children"
              initialValue={0}
            >
              <Input type="number" min={0} max={10} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="remark"
          label="Remark"
        >
          <TextArea rows={3} placeholder="Enter any additional remarks" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ManualEnquiryModal;