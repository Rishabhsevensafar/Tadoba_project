import React, { useState } from "react";
import { Form, Input, Button, Select, message, Card } from "antd";
import axios from "axios";

const { Option } = Select;

const AdminUserManager = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.post("http://localhost:5000/api/admin/create-user", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("User created successfully!");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create New User" style={{ maxWidth: 500, margin: "0 auto" }}>
      <Form form={form} layout="vertical" onFinish={handleCreateUser}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email", message: "Invalid email" }]}
        >
          <Input placeholder="Enter user email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true }, { min: 6, message: "Min 6 characters" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder="Select role">
            <Option value="seo">SEO</Option>
            <Option value="sales">Sales</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminUserManager;
