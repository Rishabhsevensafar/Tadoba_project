import React, { useState, useEffect } from "react";
import { Table, Card, Select, Tag, Space, message, Typography, Button } from "antd";
import axios from "axios";

const AdminPermissionManager = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adminToken");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [rolesRes, permissionsRes] = await Promise.all([
        axios.get("http://localhost:5001/api/roles", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5001/api/permissions", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Admin role gets all permissions, other roles as is
      const updatedRoles = rolesRes.data.map((role) => {
        if (role.name.toLowerCase() === "admin") {
          return {
            ...role,
            permissions: permissionsRes.data, // All
          };
        }
        return role;
      });

      setRoles(updatedRoles);
      setPermissions(permissionsRes.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load roles/permissions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePermissionChange = async (roleId, selectedPermissionIds) => {
    setLoading(true);
    try {
      const role = roles.find((r) => r._id === roleId);
      if (role.name.toLowerCase() === "admin") {
        message.warning("Admin permissions are fixed and cannot be changed.");
        return;
      }

      await axios.put(
        `http://localhost:5001/api/roles/${roleId}/permissions`,
        { permissions: selectedPermissionIds },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      message.success("Permissions updated successfully.");
      fetchData();
    } catch (err) {
      console.error(err);
      message.error("Failed to update permissions.");
    } finally {
      setLoading(false);
    }
  };

  const permissionColumns = [
    {
      title: "Permission Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];
  const roleColumns = [
    {
      title: "Role",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Tag color={name.toLowerCase() === "admin" ? "red" : "blue"}>
          {name}
        </Tag>
      ),
    },
    {
      title: "Current Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (perms, record) => (
        <Space size={[0, 8]} wrap>
          {perms?.map((p) => (
            <Tag key={p._id} color="blue">
              {p.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isAdmin = record.name.toLowerCase() === "admin";
        return isAdmin ? (
          <Tag color="red">All Permissions (Fixed)</Tag>
        ) : (
          <Select
            mode="multiple"
            value={record.permissions?.map((p) => p._id) || []}
            onChange={(values) => handlePermissionChange(record._id, values)}
            style={{ width: "100%" }}
            loading={loading}
            optionLabelProp="label"
            placeholder="Assign permissions"
          >
            {permissions.map((perm) => (
              <Select.Option
                key={perm._id}
                value={perm._id}
                label={perm.name}
              >
                <div>
                  <strong>{perm.name}</strong>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {perm.description}
                  </div>
                </div>
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
  ];

  return (
    <div>
      <Card title="Available Permissions" style={{ marginBottom: 24 }}>
        <Table
        className="black-bordered-table"
          columns={permissionColumns}
          dataSource={permissions}
          rowKey="_id"
          pagination={false}
          size="small"
        />
      </Card>

      <Card
        title="Role Permissions Assignment"
        extra={
          <Button type="primary" onClick={fetchData} loading={loading}>
            Refresh
          </Button>
        }
      >
        <Table
        className="black-bordered-table"
          columns={roleColumns}
          dataSource={roles}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          loading={loading}
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
    </div>
  );
};

export default AdminPermissionManager;
