import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Card,
  Table,
  Tag,
  Space,
} from "antd";
import axios from "axios";
import { CheckCheckIcon, Delete, Pen, StopCircle } from "lucide-react";

const { Option } = Select;

const AdminUserManager = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null); // Added missing state
  const token = localStorage.getItem("adminToken");

  const openEditForm = (user) => {
    form.setFieldsValue(user);
    setEditId(user._id);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users failed", err);
      message.error("Failed to load users");
    }
  };

  const handleCreateOrUpdateUser = async (values) => {
    setLoading(true);
    try {
      const url = editId
        ? `http://localhost:5000/api/profile/user/${editId}`
        : `http://localhost:5000/api/profile/create-user`;

      const method = editId ? "put" : "post";

      await axios[method](url, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      message.success(editId ? "User updated" : "User created");
      form.resetFields();
      setEditId(null);
      fetchUsers();
    } catch (err) {
      message.error("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/profile/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("User deleted");
      fetchUsers();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/profile/user/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Status updated");
      fetchUsers();
    } catch (err) {
      message.error("Status toggle failed");
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const color =
          role === "seo" ? "blue" : role === "sales" ? "green" : "purple";
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (dob) => (dob ? new Date(dob).toLocaleDateString() : "-"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => openEditForm(record)}>
            <Pen />
          </Button>
          <Button size="small" danger onClick={() => handleDelete(record._id)}>
            <Delete />
          </Button>
          <Button size="small" onClick={() => handleToggleStatus(record._id)}>
            {record.isActive ? <StopCircle /> : <CheckCheckIcon />}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="User Management" style={{ maxWidth: 800, margin: "0 auto" }}>
      <Form form={form} layout="vertical" onFinish={handleCreateOrUpdateUser}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input placeholder="Enter user email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={
            editId
              ? []
              : [{ required: true }, { min: 6, message: "Min 6 characters" }]
          }
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select
            placeholder="Select or create role"
            mode="tags" // ✅ Allows custom entries
            tokenSeparators={[","]}
            onChange={(values) => form.setFieldsValue({ role: values[0] })} // Only one role
            value={
              form.getFieldValue("role") ? [form.getFieldValue("role")] : []
            }
          >
            <Option value="seo">SEO</Option>
            <Option value="sales">Sales</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Permissions"
          name="permissions"
          rules={[
            { required: true, message: "Select at least one permission" },
          ]}
        >
          <Select mode="multiple" placeholder="Select permissions">
            <Option value="dashboard">Dashboard</Option>
            <Option value="blogs">Blogs</Option>
            <Option value="bookings">Bookings</Option>
            <Option value="enquiries">Enquiries</Option>
            <Option value="manager">Manager</Option>
            <Option value="user-manager">User Manager</Option>
            <Option value="setting">Global Settings</Option>
            <Option value="quick-payment">Quick Payment</Option>
            <Option value="contact-enquiry">Contact Enquiry</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {editId ? "Update User" : "Create User"}
          </Button>
          {editId && (
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                form.resetFields();
                setEditId(null);
              }}
            >
              Cancel
            </Button>
          )}
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        style={{ marginTop: 32 }}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default AdminUserManager;