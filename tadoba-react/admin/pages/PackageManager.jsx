import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import PackageForm from "../components/PackageForm";

const PackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]); // Safeguard: always initialized as an array
=======
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
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
  const [filter, setFilter] = useState("all"); // all | active | inactive
  const [showForm, setShowForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPackages, setTotalPackages] = useState(0);
<<<<<<< HEAD
  const [limit] = useState(6); // Packages per page
  const [loading, setLoading] = useState(true); // Add loading state
=======
  const [pageSize, setPageSize] = useState(6); // Packages per page
  const [loading, setLoading] = useState(true);
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
  const adminToken = localStorage.getItem("adminToken");

  // Fetch packages
  const fetchPackages = async (page = 1) => {
<<<<<<< HEAD
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(`http://localhost:5000/api/admin/packages/`, {
        headers: { Authorization: `Bearer ${adminToken}` },
        params: { page, limit },
      });
      setPackages(data.packages || []); // Always ensure data is an array
      setFilteredPackages(data.packages || []); // Initially show all packages
      setTotalPackages(data.totalPackages || 0);
      setLoading(false); // End loading
    } catch (error) {
      console.error("Error fetching packages:", error);
      setLoading(false); // End loading on error
    }
  };

  // Filter packages by status
  const filterPackages = (status) => {
    setFilter(status);
    if (status === "all") {
      setFilteredPackages(packages);
    } else {
      const isActive = status === "active";
      setFilteredPackages(packages.filter((pkg) => pkg.isActive === isActive));
=======
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
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
    }
  };

  // Handle delete package
  const handleDelete = async (id) => {
<<<<<<< HEAD
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
=======
    Modal.confirm({
      title: "Are you sure you want to delete this package?",
      content: "This action cannot be undone",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/tourpackage/${id}`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          });
          fetchPackages(currentPage); // Refresh the package list
        } catch (error) {
          console.error("Error deleting package:", error);
        }
      },
    });
  };

  const handleToggleStatus = async (id, isActive) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tourpackage/${id}/status`,
        { isActive: !isActive }, // ✅ Toggle the status
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
<<<<<<< HEAD
      fetchPackages(currentPage); // Refresh the package list
=======

      if (response.data.success) {
        fetchPackages(currentPage); // ✅ Refresh the package list
      } else {
        console.error("Failed to update package status:", response.data.error);
      }
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
    } catch (error) {
      console.error("Error toggling package status:", error);
    }
  };
<<<<<<< HEAD

  useEffect(() => {
    fetchPackages(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalPackages / limit);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Packages</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setSelectedPackage(null);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add Package
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => filterPackages("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </button>
        <button
          onClick={() => filterPackages("active")}
          className={`px-4 py-2 rounded ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => filterPackages("inactive")}
          className={`px-4 py-2 rounded ${
            filter === "inactive" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Inactive
        </button>
      </div>

      {loading ? (
        <p>Loading packages...</p>
      ) : (
        <div className="bg-white rounded shadow-md p-4">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Seats</th>
                <th className="border p-2">Duration</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">End Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages?.map((pkg) => (
                <tr key={pkg._id}>
                  <td className="border p-2">{pkg.title}</td>
                  <td className="border p-2">{pkg.categoryId?.name || "Unknown Category"}</td>
                  <td className="border p-2">₹{pkg.discountedPrice}</td>
                  <td className="border p-2">{pkg.totalSeats}</td>
                  <td className="border p-2">{pkg.duration}</td>
                  <td className="border p-2">{new Date(pkg.startDate).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(pkg.endDate).toLocaleDateString()}</td>
                  <td className="border p-2">
                    {pkg.isActive ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleToggleStatus(pkg._id, pkg.isActive)}
                      className={`px-2 py-1 text-sm font-medium rounded ${
                        pkg.isActive
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {pkg.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setShowForm(true);
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm text-gray-600">
            Page {currentPage} of {Math.ceil(totalPackages / limit)}
          </p>
          <button
            disabled={currentPage === Math.ceil(totalPackages / limit)}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {showForm && (
=======
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
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
        <PackageForm
          onClose={() => setShowForm(false)}
          fetchPackages={() => fetchPackages(currentPage)}
          selectedPackage={selectedPackage}
        />
<<<<<<< HEAD
      )}
=======
      </Modal>
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
    </div>
  );
};

export default PackageManager;
