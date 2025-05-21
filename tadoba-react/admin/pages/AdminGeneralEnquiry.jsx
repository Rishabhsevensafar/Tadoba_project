import React, { useEffect, useState } from "react";
import {
  Table, Card, Typography, Tag, Tooltip, Button, Space, Descriptions, Modal
} from "antd";
import {
  EyeOutlined, ReloadOutlined, ClockCircleOutlined
} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const { Title, Text } = Typography;

const AdminGeneralEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/api/general/all-enquiries");
      setEnquiries(res.data.enquiries || []);
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Enquiry Type",
      dataIndex: "enquiryType",
      key: "enquiryType",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <Text>{moment(date).format("DD-MM-YYYY HH:mm")}</Text>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Tooltip title="View Details">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedEnquiry(record);
              setIsModalVisible(true);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Card
      title={<Title level={4}><ClockCircleOutlined /> Floating Enquiries</Title>}
      extra={
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={fetchEnquiries}
          loading={loading}
        >
          Refresh
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={enquiries}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Enquiry Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedEnquiry && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{selectedEnquiry.name}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedEnquiry.email}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedEnquiry.phone}</Descriptions.Item>
            <Descriptions.Item label="Type">{selectedEnquiry.enquiryType}</Descriptions.Item>
            <Descriptions.Item label="Location">{selectedEnquiry.currentLocation || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Message">{selectedEnquiry.message}</Descriptions.Item>
            <Descriptions.Item label="IP">{selectedEnquiry?.logDetails?.ip || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Browser">{selectedEnquiry?.logDetails?.browser || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Device">{selectedEnquiry?.logDetails?.device || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Date">
              {moment(selectedEnquiry.createdAt).format("DD-MM-YYYY hh:mm A")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </Card>
  );
};

export default AdminGeneralEnquiries;
