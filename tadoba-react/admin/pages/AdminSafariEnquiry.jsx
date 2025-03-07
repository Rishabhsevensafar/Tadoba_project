import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  Typography,
  Card,
  Badge,
  message,
  Divider,
  Popconfirm,
  Row,
  Col,
  Descriptions,
} from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HourglassOutlined,
  QuestionCircleOutlined,
  TagOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AdminSafariEnquiries = () => {
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
      const response = await axios.get(
        "http://localhost:5000/api/safarienquiry/"
      );

      console.log("Raw API Response:", response.data);
      console.log("Type of enquiries:", typeof response.data.enquiries);
      console.log(
        "Is enquiries an array?:",
        Array.isArray(response.data.enquiries)
      );

      if (response.data && Array.isArray(response.data.enquiries)) {
        const validEnquiries = response.data.enquiries
          .filter((item) => typeof item === "object" && item !== null)
          .map((item) => ({
            _id: item._id || Math.random().toString(), // Ensure ID is present
            name: item.name || "N/A",
            email: item.email || "N/A",
            phone: item.phone || "N/A",
            safariZone: item.safariZone || "Unknown",
            status: item.status || "Pending",
            remark: item.remark || "No Remark",
            createdAt: item.createdAt || new Date().toISOString(),
          }));

        console.log("✅ Final Processed Enquiries for Table:", validEnquiries);
        setEnquiries(validEnquiries);
      } else {
        console.error("❌ Unexpected API response format:", response.data);
        setEnquiries([]);
      }
    } catch (error) {
      console.error("Error fetching safari enquiries:", error);
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setRemark(enquiry.remark || "");
    setStatus(enquiry.status || "Pending");
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateEnquiry = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/safarienquiry/update-status/${selectedEnquiry._id}`,
        {
          status,
          remark,
        }
      );
      message.success("Safari enquiry updated successfully!");
      fetchEnquiries();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating safari enquiry:", error);
      message.error("Failed to update safari enquiry");
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/safarienquiry/${id}`);
      message.success("Safari enquiry deleted successfully!");
      fetchEnquiries();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error deleting safari enquiry:", error);
      message.error("Failed to delete safari enquiry");
    }
  };

  // Function to get status icon and color
  const getStatusInfo = (status) => {
    if (!status)
      return { color: "red", icon: <HourglassOutlined />, text: "Pending" };

    switch (status) {
      case "Pending":
        return {
          color: "red",
          icon: <HourglassOutlined />,
          text: "Pending",
        };
      case "Success":
        return {
          color: "green",
          icon: <CheckCircleOutlined />,
          text: "Success",
        };
      case "Not Interested":
        return {
          color: "orange",
          icon: <CloseCircleOutlined />,
          text: "Not Interested",
        };
      case "No Response":
        return {
          color: "gray",
          icon: <QuestionCircleOutlined />,
          text: "No Response",
        };
      default:
        return {
          color: "blue",
          icon: <TagOutlined />,
          text: status,
        };
    }
  };

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Text>
          {createdAt ? moment(createdAt).format("DD-MM-YYYY hh:mm A") : "N/A"}
        </Text>
      ),
      sorter: (a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(a.createdAt) - new Date(b.createdAt);
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        if (!a.name || !b.name) return 0;
        return a.name.localeCompare(b.name);
      },
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text || "N/A",
    },
    {
      title: "Safari Zone",
      dataIndex: "safariZone",
      key: "safariZone",
      render: (text) => text || "N/A",
    },
    {
      title: "Remark",
      key: "remark",
      dataIndex: "remark",
      render: (text) => text || "No Remark",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const { color, icon, text } = getStatusInfo(status);
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Success", value: "Success" },
        { text: "Not Interested", value: "Not Interested" },
        { text: "No Response", value: "No Response" },
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
        ></Button>
      ),
    },
  ];

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          <TagOutlined /> Safari Enquiries Management
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
      <div className="table-container">
        <Table
  columns={columns}
  dataSource={enquiries.length > 0 ? enquiries : []}  // ✅ Ensures proper array
  rowKey={(record) => record._id || Math.random().toString()}  // ✅ Prevents undefined key issues
  loading={loading}
  pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Total ${total} enquiries` }}
  bordered
  size="middle"
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
        />
      </div>

      {/* Detailed Modal with all information and actions */}
      <Modal
        title={
          <Space>
            <EyeOutlined />
            <span>Safari Enquiry Details</span>
          </Space>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            key="delete"
            title="Are you sure you want to delete this safari enquiry?"
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
                {selectedEnquiry.name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedEnquiry.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedEnquiry.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Date Enquired">
                {selectedEnquiry.createdAt
                  ? moment(selectedEnquiry.createdAt).format(
                      "DD-MM-YYYY hh:mm A"
                    )
                  : "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title="Enquiry Details"
              bordered
              column={{ xs: 1, sm: 2 }}
              style={{ marginBottom: "24px" }}
            >
              <Descriptions.Item label="Safari Zone" span={2}>
                {selectedEnquiry.safariZone || "N/A"}
              </Descriptions.Item>
              {selectedEnquiry.message && (
                <Descriptions.Item label="Message" span={2}>
                  {selectedEnquiry.message}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Current Status">
                <Tag color={getStatusInfo(selectedEnquiry.status).color}>
                  {selectedEnquiry.status || "Pending"}
                </Tag>
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
                  <Option value="Pending">
                    <Badge status="error" text="Pending" />
                  </Option>
                  <Option value="Success">
                    <Badge status="success" text="Success" />
                  </Option>
                  <Option value="Not Interested">
                    <Badge status="warning" text="Not Interested" />
                  </Option>
                  <Option value="No Response">
                    <Badge status="default" text="No Response" />
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item label="Update Remark">
                <TextArea
                  rows={4}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter your remark or notes about this safari enquiry"
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
        .table-container {
          overflow-x: auto;
        }
      `}</style>
    </Card>
  );
};

export default AdminSafariEnquiries;
