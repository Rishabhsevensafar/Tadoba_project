import React, { useState, useEffect } from "react";
import { Card, Table, Button, Form, Input, message, Space } from "antd";
import axios from "axios";
import { Delete, Edit } from "lucide-react";

const AdminRoleManager = () => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("adminToken");

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data);
    } catch (err) {
      message.error("Failed to load roles");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const url = editId 
        ? `http://localhost:5000/api/roles/${editId}`
        : "http://localhost:5000/api/roles";
      
      const method = editId ? "put" : "post";
      
      await axios[method](url, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      message.success(editId ? "Role updated" : "Role created");
      form.resetFields();
      setEditId(null);
      fetchRoles();
    } catch (err) {
      message.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Role deleted");
      fetchRoles();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            onClick={() => {
              form.setFieldsValue(record);
              setEditId(record._id);
            }}
          >
            <Edit size={14} />
          </Button>
          <Button 
            size="small" 
            danger 
            onClick={() => handleDelete(record._id)}
          >
            <Delete size={14} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Role Management">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Role Name"
          name="name"
          rules={[{ required: true, message: "Please enter role name" }]}
        >
          <Input placeholder="e.g., SEO, Sales, Admin" />
        </Form.Item>
        
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {editId ? "Update Role" : "Create Role"}
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
        dataSource={roles}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 24 }}
      />
    </Card>
  );
};

export default AdminRoleManager;