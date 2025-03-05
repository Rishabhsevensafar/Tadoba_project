import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, Button, Modal, Form, Input, Select, Tag, Space, Typography, Card, Badge, 
  message, Divider, Popconfirm, Descriptions
} from "antd";
import { 
  EyeOutlined, CheckCircleOutlined, CloseCircleOutlined, HourglassOutlined, 
  QuestionCircleOutlined, TagOutlined, DeleteOutlined, ReloadOutlined,
  HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined
} from "@ant-design/icons";
import moment from "moment";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AdminHotelEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/hotelenquiry");
      setEnquiries(response.data);
      message.success("Enquiries loaded successfully");
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      message.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  // Function to get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return { 
          color: "red", 
          icon: <HourglassOutlined />, 
          text: "Pending"
        };
      case "resolved":
        return { 
          color: "green", 
          icon: <CheckCircleOutlined />, 
          text: "Resolved"
        };
      case "rejected":
        return { 
          color: "orange", 
          icon: <CloseCircleOutlined />, 
          text: "Rejected"
        };
      default:
        return { 
          color: "blue", 
          icon: <TagOutlined />, 
          text: status
        };
    }
  };

  const showModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setRemark(enquiry.remark || "");
    setStatus(enquiry.status);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateEnquiry = async () => {
    try {
      await axios.put(`http://localhost:5000/api/hotelenquiry/${selectedEnquiry._id}`, { status, remark });
      message.success("Enquiry updated successfully!");
      fetchEnquiries();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating enquiry:", error);
      message.error("Failed to update enquiry");
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotelenquiry/${id}`);
      message.success("Enquiry deleted successfully!");
      fetchEnquiries();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      message.error("Failed to delete enquiry");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Text>{moment(createdAt).format("DD-MM-YYYY hh:mm A")}</Text>
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Hotel Name",
      dataIndex: ["hotelId", "title"],
      key: "hotel",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const { color, icon, text } = getStatusInfo(status);
        return <Tag color={color} icon={icon}>{text}</Tag>;
      },
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Resolved", value: "resolved" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          onClick={() => showModal(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Card 
      title={
        <Title level={4} style={{ margin: 0 }}>
          <HomeOutlined /> Hotel Enquiries Management
        </Title>
      }
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
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      <Table
        columns={columns}
        dataSource={enquiries}
        rowKey="_id"
        loading={loading}
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} enquiries`
        }}
        bordered
        size="middle"
        rowClassName={(record, index) => index % 2 === 0 ? "table-row-light" : "table-row-dark"}
      />

      {/* Detailed Modal with all information and actions */}
      <Modal
        title={
          <Space>
            <EyeOutlined />
            <span>Enquiry Details</span>
          </Space>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            key="delete"
            title="Are you sure you want to delete this enquiry?"
            onConfirm={() => handleDeleteEnquiry(selectedEnquiry?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete Enquiry
            </Button>
          </Popconfirm>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handleUpdateEnquiry}
          >
            Save Changes
          </Button>,
        ]}
        width={700}
      >
        {selectedEnquiry && (
          <>
            <Descriptions 
              title="Customer Information" 
              bordered 
              column={{ xs: 1, sm: 2 }}
              style={{ marginBottom: "24px" }}
            >
              <Descriptions.Item label="Customer Name">
                <UserOutlined className="mr-2" /> {selectedEnquiry.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined className="mr-2" /> {selectedEnquiry.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined className="mr-2" /> {selectedEnquiry.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Hotel">
                <HomeOutlined className="mr-2" /> {selectedEnquiry.hotelId?.title || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions 
              title="Enquiry Details" 
              bordered 
              column={1}
              style={{ marginBottom: "24px" }}
            >
              <Descriptions.Item label="Message">
                {selectedEnquiry.message}
              </Descriptions.Item>
              <Descriptions.Item label="Current Status">
                {selectedEnquiry.status && (
                  <Tag color={getStatusInfo(selectedEnquiry.status).color}>
                    {getStatusInfo(selectedEnquiry.status).text}
                  </Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Current Remark">
                {selectedEnquiry.remark || "No remark added"}
              </Descriptions.Item>
            </Descriptions>

            <Divider style={{ margin: "16px 0" }} />
            
            <Form layout="vertical">
              <Form.Item label="Update Status" required>
                <Select 
                  value={status} 
                  onChange={(value) => setStatus(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="pending">
                    <Badge status="error" text="Pending" />
                  </Option>
                  <Option value="resolved">
                    <Badge status="success" text="Resolved" />
                  </Option>
                  <Option value="rejected">
                    <Badge status="warning" text="Rejected" />
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="Update Remark">
                <TextArea
                  rows={4}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter your remark or notes about this enquiry"
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>

      <style jsx>{`
        .table-row-light {
          background-color: #ffffff;
        }
        .table-row-dark {
          background-color: #fafafa;
        }
      `}</style>
    </Card>
  );
};

export default AdminHotelEnquiries;