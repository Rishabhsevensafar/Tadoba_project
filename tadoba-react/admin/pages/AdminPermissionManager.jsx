import React, { useState, useEffect } from "react";
import { Card, Table, Button, Select, message, Tag } from "antd";
import axios from "axios";

const AdminPermissionManager = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    try {
      const [rolesRes, permissionsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/roles", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/permissions", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setRoles(rolesRes.data);
      setPermissions(permissionsRes.data);
    } catch (err) {
      message.error("Failed to load data");
    }
  };

  const handlePermissionChange = async (roleId, selectedPermissions) => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/roles/${roleId}/permissions`,
        { permissions: selectedPermissions },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Permissions updated");
      fetchData();
    } catch (err) {
      message.error("Failed to update permissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allPermissions = [
    "dashboard",
    "blogs",
    "bookings",
    "enquiries",
    "manager",
    "user-manager",
    "setting",
    "quick-payment",
    "contact-enquiry",
  ];

  const columns = [
    {
      title: "Role",
      dataIndex: "name",
      key: "name",
      render: (name) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: "Current Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (perms) => (
        <div>
          {perms?.map((p) => (
            <Tag key={p} style={{ marginBottom: 4 }}>
              {p}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Update Permissions",
      key: "actions",
      render: (_, record) => (
        <Select
          mode="multiple"
          placeholder="Select permissions"
          defaultValue={record.permissions || []}
          style={{ width: "100%" }}
          onChange={(values) => handlePermissionChange(record._id, values)}
          loading={loading}
        >
          {allPermissions.map((perm) => (
            <Select.Option key={perm} value={perm}>
              {perm}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <Card title="Permission Management">
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default AdminPermissionManager;