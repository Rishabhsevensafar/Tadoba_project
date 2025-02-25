import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Tabs,
  Card,
  Typography,
  Spin,
  Pagination,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import PackageForm from "../components/PackageForm";

const { Title } = Typography;
const { TabPane } = Tabs;

const PackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState("all"); // all | active | inactive
  const [showForm, setShowForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPackages, setTotalPackages] = useState(0);
  const [pageSize, setPageSize] = useState(6); // Packages per page
  const [loading, setLoading] = useState(true);
  const adminToken = localStorage.getItem("adminToken");

  // Fetch packages
  const fetchPackages = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/tourpackage/`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
          params: { page, limit: pageSize },
        }
      );
      console.log(data);

      setPackages(data.packages || []);
      setTotalPackages(data.totalPackages || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setLoading(false);
    }
  };

  // Handle delete package
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/packages/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      fetchPackages(currentPage); // Refresh the package list
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  // Toggle package status
  const handleToggleStatus = async (id, isActive) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/packages/${id}/status`,
        { isActive: !isActive },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (response.data.success) {
        fetchPackages(currentPage); // ✅ Refresh the package list
      } else {
        console.error("Failed to update package status:", response.data.error);
      }
    } catch (error) {
      console.error("Error toggling package status:", error);
    }
  };
  useEffect(() => {
    fetchPackages(currentPage);
  }, [currentPage, pageSize]);

  // Filter function based on tab selection
  const getFilteredData = () => {
    if (filter === "all") return packages;
    return packages.filter((pkg) =>
      filter === "active" ? pkg.isActive : !pkg.isActive
    );
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Package ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => <span className="text-xs">{id}</span>,
    },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      render: (price) => (price ? `₹ ${price.toLocaleString()}` : "N/A"),
    },
    {
      title: "Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
      render: (totalSeats) => totalSeats || "N/A", // ✅ Ensure it doesn't show undefined
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => duration || "N/A",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            type={record.isActive ? "danger" : "primary"}
            icon={record.isActive ? <StopOutlined /> : <CheckCircleOutlined />}
            size="small"
            onClick={() => handleToggleStatus(record._id, record.isActive)}
          >
            {record.isActive ? "Deactivate" : "Activate"}
          </Button>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedPackage(record);
              setShowForm(true);
            }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];
  const handleTabChange = (key) => {
    setFilter(key);
  };

  return (
    <div style={{ padding: 24, background: "#f0f2f5", minHeight: "100vh" }}>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <Title level={3}>Manage Packages</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setShowForm(true);
              setSelectedPackage(null);
            }}
          >
            Add Package
          </Button>
        </div>

        <Tabs defaultActiveKey="all" onChange={handleTabChange}>
          <TabPane tab="All Packages" key="all" />
          <TabPane tab="Active Packages" key="active" />
          <TabPane tab="Inactive Packages" key="inactive" />
        </Tabs>

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={getFilteredData()}
            rowKey="_id"
            pagination={false}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            {/* Show total packages count */}
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              Total Packages: {totalPackages}
            </span>

            {/* Pagination Component */}
            <Pagination
              current={currentPage}
              total={totalPackages}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger
              onShowSizeChange={(current, size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
              showTotal={(total) => `Showing ${total} packages`}
            />
          </div>
        </Spin>
      </Card>

      <Modal
        visible={showForm}
        footer={null}
        onCancel={() => setShowForm(false)}
        width={800}
      >
        <PackageForm
          onClose={() => setShowForm(false)}
          fetchPackages={() => fetchPackages(currentPage)}
          selectedPackage={selectedPackage}
        />
      </Modal>
    </div>
  );
};

export default PackageManager;
