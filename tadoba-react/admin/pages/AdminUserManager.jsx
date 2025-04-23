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
  Modal,
  Typography,
  Divider,
  Tooltip,
  Badge
} from "antd";
import axios from "axios";
import { 
  CheckCircle, 
  Trash2, 
  Edit, 
  XCircle, 
  Clock, 
  User, 
  Plus, 
  RefreshCw,
  Shield,
  Search
} from "lucide-react";

const { Option } = Select;
const { Title, Text } = Typography;

const AdminUserManager = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [loginLogs, setLoginLogs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("adminToken");

  const openEditForm = (user) => {
    form.setFieldsValue({
      email: user.email,
      role: user.role?._id,
      name: user.name || "",
      contactNumber: user.contactNumber || ""
    });
    setEditId(user._id);
    setShowForm(true);
  };

  const fetchUsers = async () => {
    setTableLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/profile/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users failed", err);
      message.error("Failed to load users");
    } finally {
      setTableLoading(false);
    }
  };

  const fetchLoginLogs = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/login-logs/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoginLogs(res.data.logs || []);
      setLogModalVisible(true);
    } catch (err) {
      message.error("Failed to load login logs");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(res.data);
    } catch (err) {
      console.error("Failed to fetch roles");
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

      message.success({
        content: editId ? "User updated successfully" : "User created successfully",
        style: { marginTop: '20px' }
      });
      form.resetFields();
      setEditId(null);
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      message.error("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure you want to delete this user?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/profile/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          message.success("User deleted successfully");
          fetchUsers();
        } catch (err) {
          message.error("Delete operation failed");
        }
      }
    });
  };

  const handleToggleStatus = async (id, isActive) => {
    try {
      await axios.put(
        `http://localhost:5000/api/profile/user/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success(`User ${isActive ? "deactivated" : "activated"} successfully`);
      fetchUsers();
    } catch (err) {
      message.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  const getRoleColor = (roleName) => {
    const roleColors = {
      seo: "#1890ff",
      sales: "#52c41a",
      admin: "#f5222d",
      user: "#722ed1"
    };
    return roleColors[roleName] || "#8c8c8c";
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      render: (email) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: 28, 
            height: 28, 
            borderRadius: '50%', 
            background: '#e6f7ff', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginRight: 8 
          }}>
            <User size={14} color="#1890ff" />
          </div>
          <Text>{email}</Text>
        </div>
      )
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 130,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (role) => {
        if (!role || !role.name) return <Tag color="default">N/A</Tag>;
        
        return (
          <Tag 
            color={getRoleColor(role.name)} 
            style={{ 
              borderRadius: '12px', 
              padding: '0 10px',
              fontWeight: 500
            }}
          >
            {role.name.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      width: 100,
      render: (isActive) => (
        <Badge 
          status={isActive ? "success" : "error"} 
          text={isActive ? "Active" : "Inactive"}
          style={{ fontWeight: isActive ? 500 : 400 }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit User">
            <Button 
              type="primary" 
              size="small"
              shape="circle"
              icon={<Edit size={14} />} 
              onClick={() => openEditForm(record)}
            />
          </Tooltip>
          <Tooltip title="Delete User">
            <Button 
              type="primary" 
              danger 
              size="small"
              shape="circle"
              icon={<Trash2 size={14} />}
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
          <Tooltip title={record.isActive ? "Deactivate" : "Activate"}>
            <Button 
              type={record.isActive ? "default" : "primary"}
              size="small"
              shape="circle" 
              icon={record.isActive ? <XCircle size={14} /> : <CheckCircle size={14} />}
              onClick={() => handleToggleStatus(record._id, record.isActive)}
            />
          </Tooltip>
          <Tooltip title="Login History">
            <Button
              type="default"
              size="small"
              shape="circle"
              icon={<Clock size={14} />}
              onClick={() => {
                setSelectedUser(record);
                fetchLoginLogs(record._id);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const logColumns = [
    {
      title: "Login Time",
      dataIndex: "time",
      key: "time",
      render: (val) => (val ? new Date(val).toLocaleString() : "-"),
    },
    {
      title: "Browser",
      dataIndex: "browser",
      key: "browser",
      ellipsis: true,
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
    },
    {
      title: "IP Address",
      dataIndex: "ip",
      key: "ip",
    },
  ];

  const handleCancel = () => {
    form.resetFields();
    setEditId(null);
    setShowForm(false);
  };

  return (
    <>
    <Card 
      bordered={false} 
      className="user-management-card"
      style={{ 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.09)'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 16,
        background: 'var(--bg-color)',
        margin: '-24px -24px 24px -24px',
        padding: '16px 24px',
        borderRadius: '8px 8px 0 0',
        color: 'white'
      }}>
        <Title level={4} style={{ margin: 0, color: 'white', display: 'flex', alignItems: 'center' }}>
          <Shield size={20} style={{ marginRight: 8 }} />
          User Management Portal
        </Title>
        <Space>
          <Button 
            type="primary"
            style={{color:'#fff', borderColor:'#fff'}} 
            ghost
            icon={<RefreshCw size={14} />} 
            onClick={fetchUsers}
          >
            Refresh
          </Button>
          <Button 
            type="primary" 
            style={{color:'#fff', borderColor:'#fff'}} 
            ghost
            icon={<Plus size={14} />} 
            onClick={() => {
              form.resetFields();
              setEditId(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Hide Form" : "Add User"}
          </Button>
        </Space>
      </div>

      {showForm && (
        <>
          <Card 
            title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {editId ? (
                  <Edit size={16} style={{ marginRight: 8 }} />
                ) : (
                  <Plus size={16} style={{ marginRight: 8 }} />
                )}
                <span>{editId ? "Edit User" : "Create New User"}</span>
              </div>
            }
            style={{ 
              marginBottom: 20,
              borderRadius: '8px',
              background: '#fafafa',
              borderLeft: '4px solid var(--bg-color)'
            }}
            headStyle={{ 
              background: '#f0f7ff',
              borderBottom: '1px solid #e6f0fa'
            }}
          >
            <Form 
              form={form} 
              layout="vertical" 
              onFinish={handleCreateOrUpdateUser}
              requiredMark="optional"
              size="middle"
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Email is required' },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                  style={{ flex: '1 1 45%', minWidth: '250px' }}
                >
                  <Input prefix={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bfbfbf" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>} placeholder="user@example.com" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={
                    editId
                      ? [{ min: 6, message: "Min 6 characters" }]
                      : [{ required: true, message: 'Password is required' }, { min: 6, message: "Min 6 characters" }]
                  }
                  tooltip={editId ? "Leave blank to keep current password" : "Minimum 6 characters"}
                  style={{ flex: '1 1 45%', minWidth: '250px' }}
                >
                  <Input.Password prefix={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bfbfbf" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>} placeholder="Enter password" />
                </Form.Item>

                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: "Role is required" }]}
                  style={{ flex: '1 1 30%', minWidth: '250px' }}
                >
                  <Select 
                    prefix={<Shield size={14} />}
                    placeholder="Select user role"
                    dropdownStyle={{ borderRadius: '6px' }}
                  >
                    {roles.map((role) => (
                      <Option key={role._id} value={role._id}>
                        {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {editId && (
  <>
                <Form.Item 
                  label="Name" 
                  name="name"
                  style={{ flex: '1 1 30%', minWidth: '250px' }}
                >
                  <Input prefix={<User size={14} stroke="#bfbfbf" />} placeholder="Full name" />
                </Form.Item>

                <Form.Item 
                  label="Contact Number" 
                  name="contactNumber"
                  style={{ flex: '1 1 30%', minWidth: '250px' }}
                >
                  <Input prefix={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bfbfbf" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>} placeholder="Phone number" />
                </Form.Item>
                </>
)}
              </div>

              <Form.Item style={{ marginBottom: 0, marginTop: '12px' }}>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    icon={editId ? <Edit size={14} /> : <Plus size={14} />}
                    style={{ 
                      borderRadius: '6px',
                      height: '36px',
                      boxShadow: '0 2px 0 rgba(0,0,0,0.045)'
                    }}
                  >
                    {editId ? "Update User" : "Create User"}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    style={{ borderRadius: '6px', height: '36px' }}
                  >
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
          <Divider style={{ margin: '0 0 20px 0' }} />
        </>
      )}

      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Text 
            strong 
            style={{ 
              fontSize: '16px', 
              display: 'flex', 
              alignItems: 'center',
              color: '#262626' 
            }}
          >
            <User size={16} style={{ marginRight: 8 }} />
            User Directory
          </Text>
          <Text type="secondary">
            Total {users.length} user{users.length !== 1 ? 's' : ''}
          </Text>
        </div>
        <Input 
          prefix={<Search size={14} />} 
          placeholder="Search users..." 
          style={{ 
            width: '250px',
            borderRadius: '6px'
          }} 
        />
      </div>
      
      <Table
      className="black-bordered-table"
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={tableLoading}
        pagination={{ 
          pageSize: 10,
          hideOnSinglePage: true,
          showSizeChanger: false,
          showTotal: (total) => `Total ${total} items`,
          style: { marginTop: '16px' }
        }}
        // scroll={{ x: 'max-content' }}
        style={{ 
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
        rowClassName={(record, index) => 
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
      />

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Clock size={16} style={{ marginRight: 8 }} />
            <span>Login History - {selectedUser?.email}</span>
          </div>
        }
        open={logModalVisible}
        onCancel={() => setLogModalVisible(false)}
        footer={<Button onClick={() => setLogModalVisible(false)}>Close</Button>}
        width={700}
        style={{ top: 20 }}
        bodyStyle={{ padding: '12px 0' }}
      >
        {loginLogs.length > 0 ? (
          <Table
            dataSource={loginLogs}
            columns={logColumns}
            rowKey={(record, idx) => idx}
            pagination={{ pageSize: 5, hideOnSinglePage: true }}
            size="small"
            style={{ 
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          />
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px 0',
            background: '#f9f9f9',
            borderRadius: '8px'
          }}>
            <Clock size={40} stroke="#d9d9d9" />
            <div style={{ marginTop: 16 }}>
              <Text type="secondary">No login history available</Text>
            </div>
          </div>
        )}
      </Modal>
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
          background-color: var(--bg-color) !important;
          color: #fff !important;
        }
        .black-bordered-table th {
          background-color: var(--bg-color) !important;
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

export default AdminUserManager;