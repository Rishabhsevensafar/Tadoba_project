import React, { useEffect, useState } from "react";
import { getAllSafariBookings, updateSafariBooking } from "../service/api";
import {
  Table,
  Button,
  Tag,
  message,
  Popconfirm,
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
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { CSVLink } from "react-csv";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SafariBookingReport = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditStatusModalOpen, setIsEditStatusModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, searchText, statusFilter, dateRange]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllSafariBookings();
      const bookingsData = Array.isArray(response?.data)
        ? response.data.map((booking) => ({
            ...booking,
            numberOfChildren: booking.children, // Transform here
            children: undefined,
          }))
        : [];
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      message.error("Failed to load safari bookings");
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
          booking.bookingId?.toLowerCase().includes(lowerSearch) ||
          booking.email?.toLowerCase().includes(lowerSearch) ||
          booking.phone?.includes(searchText)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((booking) => booking.paymentStatus === statusFilter);
    }

    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      result = result.filter((booking) => {
        const bookingDate = moment(booking.date);
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
    setSelectedStatus(booking.paymentStatus);
    setIsEditStatusModalOpen(true);
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      await updateSafariBooking(id, { paymentStatus: newStatus });
      message.success("Payment status updated successfully");
      fetchBookings();
      setIsEditStatusModalOpen(false);
    } catch (error) {
      message.error("Failed to update payment status");
      console.error("Error updating booking:", error);
    }
  };

  const getStatusTag = (paymentStatus) => {
    const statusConfig = {
      Success: { color: "green", icon: <CheckOutlined /> },
      Failed: { color: "red", icon: <CloseOutlined /> },
      Pending: { color: "orange" },
    };

    return (
      <Tag
        color={statusConfig[paymentStatus]?.color || "orange"}
        icon={statusConfig[paymentStatus]?.icon}
      >
        {paymentStatus || "Pending"}
      </Tag>
    );
  };

  const renderBookingDetails = (booking) => {
    if (!booking) return null;

    const bookingDetails = [
      { label: "Booking ID", value: booking.bookingId || "N/A" },
      { label: "Customer Name", value: booking.name || "N/A" },
      { label: "Email", value: booking.email || "N/A" },
      { label: "Phone", value: booking.phone || "N/A" },
      { label: "Safari Zone", value: booking.safariZone || "N/A" },
      {
        label: "Date",
        value: booking.date
          ? moment(booking.date).format("DD MMM YYYY")
          : "N/A",
      },
      { label: "Time", value: booking.safariTime || "N/A" },
      { label: "Vehicle Type", value: booking.vehicleType || "N/A" },
      { label: "Adults", value: booking.adults || 0 },
      { label: "Children", value: booking.numberOfChildren || 0 },
      {
        label: "Amount Paid",
        value: booking.amountPaid ? `₹${booking.amountPaid}` : "N/A",
      },
      { label: "Payment Status", value: getStatusTag(booking.paymentStatus) },
      { label: "Payment ID", value: booking.paymentId || "N/A" },
      { label: "Payment Date", value: booking.paymentDate || "N/A" },
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
          {booking.travelerDetails?.length > 0 ? (
            booking.travelerDetails.map((traveler, index) => (
              <Card key={index} style={{ marginBottom: 16 }}>
                <p>
                  <strong>Full Name:</strong> {traveler.fullName || "N/A"}
                </p>
                <p>
                  <strong>Age:</strong> {traveler.age || "N/A"}
                </p>
                <p>
                  <strong>Gender:</strong> {traveler.gender || "N/A"}
                </p>
                <p>
                  <strong>Nationality:</strong> {traveler.nationality || "N/A"}
                </p>
                <p>
                  <strong>ID Type:</strong> {traveler.idType || "N/A"}
                </p>
                <p>
                  <strong>ID Number:</strong> {traveler.idNumber || "N/A"}
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
      dataIndex: "bookingId",
      key: "bookingId",
      width: 100,
      render: (text) => text || "N/A",
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
      title: "Safari Details",
      key: "details",
      render: (_, record) => (
        <div>
          <div>
            <strong>Zone:</strong> {record.safariZone || "N/A"}
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {record.date ? moment(record.date).format("DD MMM YYYY") : "N/A"}
          </div>
          <div>
            <strong>Time:</strong> {record.safariTime || "N/A"}
          </div>
        </div>
      ),
    },
    {
      title: "Travelers",
      key: "travelers",
      render: (_, record) => (
        <div>
          <div>
            <strong>Adults:</strong> {record.adults || 0}
          </div>
          <div>
            <strong>Children:</strong> {record.numberOfChildren || 0}
          </div>
        </div>
      ),
      width: 100, 
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 120,
      render: (paymentStatus) => getStatusTag(paymentStatus),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space>
          <Tooltip title="View details">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>

          <Tooltip title="Edit status">
            <Button icon={<EditOutlined />} onClick={() => handleEditStatus(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const prepareCSVData = () => {
    return filteredBookings.map((booking) => ({
      "Booking ID": booking.bookingId || "N/A",
      "Customer Name": booking.name || "N/A",
      Email: booking.email || "N/A",
      Phone: booking.phone || "N/A",
      "Safari Zone": booking.safariZone || "N/A",
      Date: booking.date ? moment(booking.date).format("DD-MM-YYYY") : "N/A",
      "Safari Time": booking.safariTime || "N/A",
      Adults: booking.adults || 0,
      Children: booking.numberOfChildren || 0,
      "Vehicle Type": booking.vehicleType || "N/A",
      "Amount Paid": booking.amountPaid || 0,
      "Payment Status": booking.paymentStatus || "N/A",
      "Payment ID": booking.paymentId || "N/A",
    }));
  };

  return (
    <div style={{ padding: 24 }}>
      <Card
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 12, fontSize: 20 }}>🧭</span>
            <span style={{ fontSize: 18, fontWeight: 500 }}>
              Safari Booking Reports
            </span>
          </div>
        }
        extra={
          <CSVLink
            data={prepareCSVData()}
            filename={`safari-bookings-${moment().format("YYYY-MM-DD")}.csv`}
          >
            <Button type="primary" icon={<DownloadOutlined />}>
              Export CSV
            </Button>
          </CSVLink>
        }
        bordered={false}
      >
        <div style={{ marginBottom: 24 }}>
          <Space size="large" wrap>
            <Input
              placeholder="Search bookings..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />

            <Select
              placeholder="Filter by payment status"
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
              style={{ width: 180 }}
            >
              <Option value="all">All Payment Status</Option>
              <Option value="Success">Success</Option>
              <Option value="Failed">Failed</Option>
              <Option value="Pending">Pending</Option>
            </Select>

            <RangePicker
              placeholder={["Start Date", "End Date"]}
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
          className="custom-table"
        />
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
            onClick={() => updateBookingStatus(selectedBooking?._id, selectedStatus)}
          >
            Update Status
          </Button>,
        ]}
      >
        <div style={{ padding: "20px 0" }}>
          <p style={{ marginBottom: 16 }}>
            <strong>Booking ID:</strong> {selectedBooking?.bookingId || "N/A"}
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Customer:</strong> {selectedBooking?.name || "N/A"}
          </p>
          <p style={{ marginBottom: 16 }}>
            <strong>Current Status:</strong> {getStatusTag(selectedBooking?.paymentStatus)}
          </p>
          
          <div style={{ marginTop: 24 }}>
            <p><strong>Select New Status:</strong></p>
            <Select
              style={{ width: "100%" }}
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
            >
              <Option value="Success">Success</Option>
              <Option value="Failed">Failed</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </div>
        </div>
      </Modal>

      <style jsx global>{`
        .custom-table table {
          border: 1px solid #000 !important;
        }

        .custom-table th {
          background-color: #2c5f2d !important;
          border: 1px solid #000 !important;
          color: #fff !important;
        }

        .custom-table td {
          border: 1px solid #000 !important;
        }

        .custom-table .ant-table-column-sorter {
          color: #1890ff;
        }

        .custom-table .ant-table-column-sort .ant-table-column-sorter-up.active,
        .custom-table
          .ant-table-column-sort
          .ant-table-column-sorter-down.active {
          color: #ff4d4f;
        }
      `}</style>
    </div>
  );
};

export default SafariBookingReport;