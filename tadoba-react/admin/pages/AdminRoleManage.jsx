import React, { useState, useEffect } from "react";
import { 
  Form, 
  Input, 
  Button, 
  Table, 
  Card, 
  Space, 
  Tag, 
  message,
  Popconfirm,
  Select
} from "antd";
import { 
  DeleteOutlined, 
  EditOutlined, 
  PlusOutlined 
} from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const AdminRoleManager = () => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
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
      message.error("Failed to fetch roles");
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/permissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPermissions(res.data);
    } catch (err) {
      message.error("Failed to fetch permissions");
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
      message.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (name.toLowerCase() === "admin") {
      return message.warning("Admin role cannot be deleted");
    }
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success) {
        message.success(response.data.message || "Role deleted");
        fetchRoles();
      } else {
        message.error(response.data.message || "Delete failed");
      }
    } catch (err) {
      message.error(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Delete failed"
      );
    }
  };

  const handleEdit = (role) => {
    form.setFieldsValue({
      name: role.name,
      description: role.description,
      permissions: role.permissions?.map(p => p._id),
    });
    setEditId(role._id);
  };

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (perms) =>
        perms?.length > 0 ? (
          <Space wrap>
            {perms.map((p) => (
              <Tag key={p._id}>{p.name}</Tag>
            ))}
          </Space>
        ) : (
          <Tag color="gray">None</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure to delete this role?"
            onConfirm={() => handleDelete(record._id, record.name)}
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
    <>
    <Card
      title="Role Management"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditId(null);
          }}
        >
          New Role
        </Button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginBottom: 24 }}
      >
        <Form.Item
          label="Role Name"
          name="name"
          rules={[{ required: true, message: "Please enter role name" }]}
        >
          <Input placeholder="e.g., Admin, Manager, Editor" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* <Form.Item
          label="Permissions"
          name="permissions"
          rules={[{ required: true, message: "Select at least one permission" }]}
        >
          <Select mode="multiple" placeholder="Assign permissions">
            {permissions.map((p) => (
              <Option key={p._id} value={p._id}>
                {p.name}
              </Option>
            ))}
          </Select>
        </Form.Item> */}

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
      className="black-bordered-table"
        columns={columns}
        dataSource={roles}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </Card>

        <style jsx>{`
        .black-bordered-table table {
          border: 1px solid #000 !important;
        }
        .black-bordered-table th,
        .black-bordered-table td {
          border: 1px solid #000 !important;
        }
        .black-bordered-descriptions table {
          border: 1px solid #000 !important;
        }
        .black-bordered-descriptions th,
        .black-bordered-descriptions td {
          border: 1px solid #000 !important;
        }
        .black-bordered-descriptions th {
          background-color: #2c5f2d !important;
          color: #fff !important;
        }
        .black-bordered-table th {
          background-color: #2c5f2d !important;
          color: #fff !important;
        }

        .black-bordered-table
          .ant-table-column-sort
          .ant-table-column-sorter-up.active,
        .black-bordered-table
          .ant-table-column-sort
          .ant-table-column-sorter-down.active {
          color: #ff4d4f;
        }
      `}</style>
    </>
  );
};

export default AdminRoleManager;
