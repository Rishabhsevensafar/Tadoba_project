import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Tag,
  message,
  Modal,
  Space,
  Card,
  Input,
  DatePicker,
  Select,
  Tooltip,
} from "antd";
import {
  DownloadOutlined,
  EyeOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { CSVLink } from "react-csv";

const { RangePicker } = DatePicker;
const { Option } = Select;

const TourBookingReport = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState([]);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, searchText, statusFilter, dateRange]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/tourbooking");
      setBookings(
        Array.isArray(response?.data?.bookings) ? response.data.bookings : []
      );
    } catch (error) {
      console.error("Error fetching bookings:", error);
      message.error("Failed to load tour bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...bookings];

    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.name?.toLowerCase().includes(lowerSearch) ||
          booking._id?.toLowerCase().includes(lowerSearch) ||
          booking.email?.toLowerCase().includes(lowerSearch) ||
          booking.phone?.includes(searchText)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (booking) => booking.paymentStatus === statusFilter
      );
    }

    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      result = result.filter((booking) => {
        const bookingDate = moment(booking.checkInDate);
        return (
          bookingDate.isSameOrAfter(start) && bookingDate.isSameOrBefore(end)
        );
      });
    }

    setFilteredBookings(result);
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleEditStatus = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.paymentStatus);
    setIsEditStatusModalOpen(true);
  };

  const updateBookingStatus = async () => {
    if (!selectedBooking || !newStatus) return;

    try {
      setStatusUpdateLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.put(
        `http://localhost:5001/api/tourbooking/${selectedBooking._id}/status`,
        {
          paymentStatus: newStatus,
        }
      );

      if (response.data.success) {
        message.success("Payment status updated successfully");

        // Update the status in both arrays
        const updatedBookings = bookings.map((booking) =>
          booking._id === selectedBooking._id
            ? { ...booking, paymentStatus: newStatus }
            : booking
        );
        setBookings(updatedBookings);

        setIsEditStatusModalOpen(false);
      } else {
        message.error("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update payment status");
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const getStatusTag = (status) => {
    const statusConfig = {
      paid: { color: "green", text: "PAYMENT SUCCESSFUL" },
      pending: { color: "orange", text: "PAYMENT PENDING" },
      failed: { color: "red", text: "PAYMENT FAILED" },
    };

    return (
      <Tag color={statusConfig[status]?.color || "orange"}>
        {statusConfig[status]?.text || "PENDING"}
      </Tag>
    );
  };

  const renderBookingDetails = (booking) => {
    if (!booking) return null;

    const bookingDetails = [
      { label: "Booking ID", value: booking._id || "N/A" },
      { label: "Customer Name", value: booking.name || "N/A" },
      { label: "Email", value: booking.email || "N/A" },
      { label: "Phone", value: booking.phone || "N/A" },
      { label: "Address", value: booking.address || "N/A" },
      { label: "ID Proof", value: booking.idProof || "N/A" },
      { label: "Package", value: booking.package?.title || "N/A" },
      { label: "Hotel", value: booking.hotel?.title || "N/A" },
      {
        label: "Check-In Date",
        value: booking.checkInDate
          ? moment(booking.checkInDate).format("DD MMM YYYY")
          : "N/A",
      },
      {
        label: "Check-Out Date",
        value: booking.checkOutDate
          ? moment(booking.checkOutDate).format("DD MMM YYYY")
          : "N/A",
      },
      { label: "Number of Persons", value: booking.numPersons || 0 },
      { label: "Number of Rooms", value: booking.numRooms || 0 },
      {
        label: "Total Price",
        value: booking.totalPrice ? `₹${booking.totalPrice}` : "N/A",
      },
      { label: "Payment Status", value: getStatusTag(booking.paymentStatus) },
      {
        label: "Created At",
        value: booking.createdAt
          ? moment(booking.createdAt).format("DD MMM YYYY HH:mm")
          : "N/A",
      },
      {
        label: "Updated At",
        value: booking.updatedAt
          ? moment(booking.updatedAt).format("DD MMM YYYY HH:mm")
          : "N/A",
      },
    ];

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <h4 style={{ marginBottom: 16 }}>Booking Information</h4>
          {bookingDetails.map((item, index) => (
            <p key={index} style={{ marginBottom: 8 }}>
              <strong>{item.label}:</strong> {item.value}
            </p>
          ))}
        </div>

        <div>
          <h4 style={{ marginBottom: 16 }}>Traveler Information</h4>
          {booking.travelers?.length > 0 ? (
            booking.travelers.map((traveler, index) => (
              <Card key={index} style={{ marginBottom: 16 }}>
                <p>
                  <strong>Name:</strong> {traveler.name || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {traveler.phone || "N/A"}
                </p>
                <p>
                  <strong>ID Proof:</strong> {traveler.idProof || "N/A"}
                </p>
              </Card>
            ))
          ) : (
            <p>No traveler details available</p>
          )}
        </div>
      </div>
    );
  };

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
      width: 100,
      render: (text) => (text ? text.substring(0, 8) + "..." : "N/A"),
    },
    {
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.name || "N/A"}</div>
          <div style={{ fontSize: 12 }}>{record.email || "N/A"}</div>
          <div style={{ fontSize: 12 }}>{record.phone || "N/A"}</div>
        </div>
      ),
    },
    {
      title: "Tour Details",
      key: "details",
      render: (_, record) => (
        <div>
          <div>
            <strong>Package:</strong> {record.package?.title || "N/A"}
          </div>
          <div>
            <strong>Hotel:</strong> {record.hotel?.title || "N/A"}
          </div>
        </div>
      ),
    },
    {
      title: "Stay Period",
      key: "period",
      render: (_, record) => (
        <div>
          <div>
            <strong>Check-In:</strong>{" "}
            {record.checkInDate
              ? moment(record.checkInDate).format("DD MMM YYYY")
              : "N/A"}
          </div>
          <div>
            <strong>Check-Out:</strong>{" "}
            {record.checkOutDate
              ? moment(record.checkOutDate).format("DD MMM YYYY")
              : "N/A"}
          </div>
        </div>
      ),
    },
    {
      title: "Guests",
      key: "guests",
      render: (_, record) => (
        <div>
          <div>
            <strong>Persons:</strong> {record.numPersons || 0}
          </div>
          <div>
            <strong>Rooms:</strong> {record.numRooms || 0}
          </div>
        </div>
      ),
      width: 80,
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price) => `₹${price || 0}`,
    },
    {
      title: "Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 140,
      render: (status) => getStatusTag(status),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="View details">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Edit status">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditStatus(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const prepareCSVData = () => {
    return filteredBookings.map((booking) => ({
      "Booking ID": booking._id || "N/A",
      "Customer Name": booking.name || "N/A",
      Email: booking.email || "N/A",
      Phone: booking.phone || "N/A",
      Address: booking.address || "N/A",
      Package: booking.package?.title || "N/A",
      Hotel: booking.hotel?.title || "N/A",
      "Check-In Date": booking.checkInDate
        ? moment(booking.checkInDate).format("DD-MM-YYYY")
        : "N/A",
      "Check-Out Date": booking.checkOutDate
        ? moment(booking.checkOutDate).format("DD-MM-YYYY")
        : "N/A",
      "Number of Persons": booking.numPersons || 0,
      "Number of Rooms": booking.numRooms || 0,
      "Total Price": booking.totalPrice || 0,
      "Payment Status":
        booking.paymentStatus === "paid"
          ? "PAYMENT SUCCESSFUL"
          : booking.paymentStatus === "failed"
          ? "PAYMENT FAILED"
          : "PAYMENT PENDING",
      "Created At": booking.createdAt
        ? moment(booking.createdAt).format("DD-MM-YYYY HH:mm")
        : "N/A",
    }));
  };

  // Custom table styles
  const tableStyles = {
    table: {
      border: "1px solid black",
      borderCollapse: "collapse",
    },
    thead: {
      backgroundColor: "#f0f0f0", // Light gray background for headers
      fontWeight: "bold",
    },
    th: {
      border: "1px solid black",
      padding: "12px",
      backgroundColor: "#e6f7ff", // Light blue background for header cells
    },
    td: {
      border: "1px solid black",
      padding: "8px",
    },
  };

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 12, fontSize: 20 }}>🏨</span>
            <span style={{ fontSize: 18, fontWeight: 500 }}>
              Tour Booking Reports
            </span>
          </div>
        }
        extra={
          <CSVLink
            data={prepareCSVData()}
            filename={`tour-bookings-${moment().format("YYYY-MM-DD")}.csv`}
          >
            <Button type="primary" icon={<DownloadOutlined />}>
              Export CSV
            </Button>
          </CSVLink>
        }
        bordered={false}
      >
        <div style={{ marginBottom: 24 }}>
          <Space size="large">
            <Input
              placeholder="Search bookings..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />

            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              style={{ width: 180 }}
            >
              <Option value="all">All Status</Option>
              <Option value="pending">Payment Pending</Option>
              <Option value="paid">Payment Successful</Option>
              <Option value="failed">Payment Failed</Option>
            </Select>

            <RangePicker
              placeholder={["Check-In From", "Check-In To"]}
              onChange={(dates) => setDateRange(dates)}
              style={{ width: 250 }}
            />
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} bookings`,
          }}
          // scroll={{ x: 'max-content' }}
          className="custom-table black-bordered-table"
          // Apply custom styles
          components={{
            header: {
              cell: (props) => <th style={tableStyles.th} {...props} />,
            },
            body: {
              cell: (props) => <td style={tableStyles.td} {...props} />,
            },
          }}
        />

        {/* Add custom CSS for table styling */}
        <style jsx>{`
          .custom-table th {
            background-color: #e6f7ff;
            border: 1px solid black !important;
          }
          .custom-table td {
            border: 1px solid black !important;
          }
          .ant-table-thead > tr > th {
            background-color: #e6f7ff;
            border: 1px solid black;
          }
          .ant-table-tbody > tr > td {
            border: 1px solid black;
          }
        `}</style>
      </Card>

      {/* View Booking Details Modal */}
      <Modal
        title={
          <>
            <EyeOutlined style={{ marginRight: 8 }} />
            Booking Details
          </>
        }
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {renderBookingDetails(selectedBooking)}
      </Modal>

      {/* Edit Status Modal */}
      <Modal
        title={
          <>
            <EditOutlined style={{ marginRight: 8 }} />
            Update Payment Status
          </>
        }
        open={isEditStatusModalOpen}
        onCancel={() => setIsEditStatusModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditStatusModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={statusUpdateLoading}
            onClick={updateBookingStatus}
          >
            Update Status
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <p>
            <strong>Booking ID:</strong> {selectedBooking?._id}
          </p>
          <p>
            <strong>Customer:</strong> {selectedBooking?.name}
          </p>
          <p>
            <strong>Current Status:</strong>{" "}
            {selectedBooking && getStatusTag(selectedBooking.paymentStatus)}
          </p>
        </div>

        <div>
          <p>
            <strong>New Status:</strong>
          </p>
          <Select
            style={{ width: "100%" }}
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
          >
            <Option value="pending">Payment Pending</Option>
            <Option value="paid">Payment Successful</Option>
            <Option value="failed">Payment Failed</Option>
          </Select>
        </div>
      </Modal>
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

export default TourBookingReport;
