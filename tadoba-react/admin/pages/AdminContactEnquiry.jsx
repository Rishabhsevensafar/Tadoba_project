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
  message,
  Popconfirm,
  Card,
  Typography,
  Divider,
  Badge,
  DatePicker,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const AdminContactEnquiries = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/contactenquiry/");
      if (response.data && Array.isArray(response.data.contacts)) {
        setContacts(response.data.contacts);
        setFilteredContacts(response.data.contacts);
      } else {
        console.error("Unexpected API response:", response.data);
        setContacts([]);
        setFilteredContacts([]);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      message.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (contact) => {
    setSelectedContact(contact);
    setStatus(contact.status || "Pending");
    setRemark(contact.remark || "");
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/contactenquiry/update/${selectedContact._id}`, {
        status,
        remark,
      });
      message.success("Contact updated successfully!");
      fetchContacts();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating contact:", error);
      message.error("Failed to update contact");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contactenquiry/delete/${id}`);
      message.success("Contact deleted successfully!");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      message.error("Failed to delete contact");
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "Pending":
        return <Tag color="red"><ExclamationCircleOutlined /> Pending</Tag>;
      case "Success":
        return <Tag color="green"><CheckCircleOutlined /> Success</Tag>;
      case "Not Intrested":
        return <Tag color="orange"><CloseCircleOutlined /> Not Intrested</Tag>;
      case "No Response":
        return <Tag color="gray"><CloseCircleOutlined /> No Response</Tag>;
      default:
        return <Tag color="blue">{status}</Tag>;
    }
  };

  // ✅ Filter Contacts Based on Status and Date    
  useEffect(() => {
    let filteredData = contacts;

    if (statusFilter) {
      filteredData = filteredData.filter((contact) => contact.status === statusFilter);
    }

    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      filteredData = filteredData.filter((contact) =>
        moment(contact.createdAt).isBetween(start, end, "day", "[]")
      );
    }

    setFilteredContacts(filteredData);
  }, [statusFilter, dateRange, contacts]);

  // ✅ Table Columns
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} onClick={() => showModal(record)} />
          <Popconfirm
            title="Are you sure you want to delete this contact?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={<Title level={4}>Admin Contact Enquiries</Title>}
      extra={
        <Button type="primary" icon={<ReloadOutlined />} onClick={fetchContacts} loading={loading}>
          Refresh
        </Button>
      }
    >
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        {/* Status Filter */}
        <Select
          placeholder="Filter by Status"
          value={statusFilter}
          onChange={setStatusFilter}
          allowClear
          className="w-48"
        >
          <Option value="Pending">Pending</Option>
          <Option value="Resolved">Success</Option>
          <Option value="Not Intrested">Not Intrested</Option>
          <Option value="No Response">No Response</Option>
        </Select>

        {/* Date Filter */}
        <RangePicker
          onChange={(dates) => setDateRange(dates)}
          format="DD-MM-YYYY"
          className="w-60"
        />
      </div>

      {/* Contact Table */}
      <Table
        columns={columns}
        dataSource={filteredContacts}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
        size="middle"
      />

      {/* Contact Details Modal */}
      <Modal
        title="Contact Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>Cancel</Button>,
          <Button key="update" type="primary" onClick={handleUpdate}>Update</Button>,
        ]}
      >
        {selectedContact && (
          <>
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Phone:</strong> {selectedContact.phone}</p>
            <p><strong>Message:</strong> {selectedContact.message}</p>
            <p><strong>Date:</strong> {moment(selectedContact.createdAt).format("DD-MM-YYYY hh:mm A")}</p>

            <Divider />

            <Form layout="vertical">
              <Form.Item label="Update Status">
                <Select value={status} onChange={setStatus} className="w-full">
                  <Option value="Pending">Pending</Option>
                  <Option value="Resolved">Success</Option>
                  <Option value="Not Intrested"> Not Intrested</Option>
                  <Option value="No Response"> No Response</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Remark">
                <TextArea rows={3} value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Enter remark or notes" />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </Card>
  );
};

export default AdminContactEnquiries;
