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
  Divider,
  Avatar,
  Tooltip,
  Badge,
  Statistic,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  StopOutlined,
  CalendarOutlined,
  GlobalOutlined,
  TeamOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import PackageForm from "../components/PackageForm";

const { Title, Text } = Typography;
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
  const [stats, setStats] = useState({
    active: 0,
    inactive: 0,
    totalSeats: 0,
    avgPrice: 0,
  });
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

      setPackages(data.packages || []);
      setTotalPackages(data.totalPackages || 0);

      // Calculate statistics
      const activePackages = data.packages.filter((pkg) => pkg.isActive);
      const inactivePackages = data.packages.filter((pkg) => !pkg.isActive);
      const totalSeats = data.packages.reduce(
        (sum, pkg) => sum + (pkg.totalSeats || 0),
        0
      );
      const avgPrice = data.packages.length
        ? data.packages.reduce((sum, pkg) => sum + (pkg.price || 0), 0) /
          data.packages.length
        : 0;

      setStats({
        active: activePackages.length,
        inactive: inactivePackages.length,
        totalSeats,
        avgPrice: Math.round(avgPrice),
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setLoading(false);
    }
  };

  // Handle delete package
  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this package?",
      icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/tourpackage/${id}`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          });
          fetchPackages(currentPage);
        } catch (error) {
          console.error("Error deleting package:", error);
        }
      },
    });
  };

  // Toggle package status
  const handleToggleStatus = async (id, isActive) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tourpackage/${id}/status`,
        { isActive: !isActive },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (response.data.success) {
        fetchPackages(currentPage);
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

  // Get random background color for package avatar
  const getBackgroundColor = (title) => {
    const colors = [
      "#1890ff",
      "#52c41a",
      "#722ed1",
      "#faad14",
      "#13c2c2",
      "#eb2f96",
      "#fa541c",
      "#a0d911",
      "#2f54eb",
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  const columns = [
    {
      title: (
        <>
          <GlobalOutlined /> Tour Package
        </>
      ),
      key: "title",
      render: (record) => (
        <Space>
          <Space direction="vertical" size={0}>
            <Text strong>{record.title}</Text>
            <Text style={{ fontSize: "12px" }}>
              ID: {record._id?.substring(0, 12)}...
            </Text>
          </Space>
        </Space>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: (
        <>
          <DollarOutlined /> Price
        </>
      ),
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price) => (
        <Text strong style={{ color: "#52c41a" }}>
          ₹ {price?.toLocaleString() || "N/A"}
        </Text>
      ),
      sorter: (a, b) => (a.price || 0) - (b.price || 0),
    },
    {
      title: (
        <>
          <TeamOutlined /> Seats
        </>
      ),
      dataIndex: "totalSeats",
      key: "totalSeats",
      render: (totalSeats) => (
        <Badge
          count={totalSeats || 0}
          showZero
          style={{ backgroundColor: totalSeats ? "#1890ff" : "#d9d9d9" }}
        />
      ),
      sorter: (a, b) => (a.totalSeats || 0) - (b.totalSeats || 0),
      width: "80px",
    },
    {
      title: (
        <>
          <ClockCircleOutlined /> Duration
        </>
      ),
      dataIndex: "duration",
      key: "duration",
      render: (duration) => (
        <Tag color="blue">
          <ClockCircleOutlined /> {duration || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Hotels",
      dataIndex: "hotels",
      key: "hotels",
      render: (hotels) =>
        hotels && hotels.length > 0
          ? hotels.map((hotel) => hotel.title).join(", ") // ✅ Display hotel names
          : "No hotels assigned",
    },
    {
      title: (
        <>
          <CalendarOutlined /> Period
        </>
      ),
      key: "period",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text>
            <CalendarOutlined /> Start:{" "}
            {record.startDate
              ? new Date(record.startDate).toLocaleDateString()
              : "N/A"}
          </Text>
          <Text>
            <CalendarOutlined /> End:{" "}
            {record.endDate
              ? new Date(record.endDate).toLocaleDateString()
              : "N/A"}
          </Text>
        </Space>
      ),
      sorter: (a, b) => new Date(a.startDate || 0) - new Date(b.startDate || 0),
    },
    {
      title: (
        <>
          <AppstoreOutlined /> Status
        </>
      ),
      dataIndex: "isActive",
      key: "status",
      render: (isActive) => (
        <Tag
          color={isActive ? "green" : "error"}
          style={{ padding: "4px 12px" }}
        >
          {isActive ? (
            <>
              <CheckCircleOutlined /> Active
            </>
          ) : (
            <>
              <StopOutlined /> Inactive
            </>
          )}
        </Tag>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 140,
      render: (_, record) => (
        <Space size="small">
          <Tooltip
            title={record.isActive ? "Deactivate Package" : "Activate Package"}
          >
            <Button
              type={record.isActive ? "default" : "primary"}
              icon={
                record.isActive ? <StopOutlined /> : <CheckCircleOutlined />
              }
              onClick={() => handleToggleStatus(record._id, record.isActive)}
              shape="circle"
            />
          </Tooltip>
          <Tooltip title="Edit Package">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedPackage(record);
                setShowForm(true);
              }}
              shape="circle"
            />
          </Tooltip>
          <Tooltip title="Delete Package">
            <Button
              type="default"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record._id)}
              shape="circle"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTabChange = (key) => {
    setFilter(key);
  };

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <Card className="shadow-md" bodyStyle={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0 }}>
              <GlobalOutlined style={{ marginRight: 8 }} />
              Tours & Packages Management
            </Title>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => {
              setShowForm(true);
              setSelectedPackage(null);
            }}
            style={{ height: "45px", borderRadius: "6px" }}
          >
            Add Tours & Packages
          </Button>
        </div>

        <Divider style={{ margin: "16px 0" }} />

        <Tabs
          defaultActiveKey="all"
          onChange={handleTabChange}
          type="card"
          style={{ marginBottom: 16 }}
        >
          <TabPane
            tab={
              <span>
                <AppstoreOutlined /> All Tours & Packages
              </span>
            }
            key="all"
          />
          <TabPane
            tab={
              <span>
                <CheckCircleOutlined /> Active Tours & Packages
              </span>
            }
            key="active"
          />
          <TabPane
            tab={
              <span>
                <StopOutlined /> Inactive Tours & Packages
              </span>
            }
            key="inactive"
          />
        </Tabs>

        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={getFilteredData()}
            rowKey="_id"
            pagination={false}
            bordered
            style={{
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            rowClassName={(record, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            className="black-bordered-table"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "500" }}>
              Total Packages: {totalPackages}
            </span>

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
              style={{ marginBottom: 0 }}
            />
          </div>
        </Spin>
      </Card>

      <Modal
        visible={showForm}
        footer={null}
        onCancel={() => setShowForm(false)}
        width={800}
        destroyOnClose
        closable={false}
      >
        <PackageForm
          onClose={() => setShowForm(false)}
          fetchPackages={() => fetchPackages(currentPage)}
          selectedPackage={selectedPackage}
        />
      </Modal>

      <style jsx>{`
        .table-row-light {
          background-color: #ffffff;
        }
        .table-row-dark {
          background-color: #f9f9f9;
        }
        .shadow-md {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
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
        .black-bordered-table .ant-table-column-sorter {
          color: #fff;
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

export default PackageManager;
