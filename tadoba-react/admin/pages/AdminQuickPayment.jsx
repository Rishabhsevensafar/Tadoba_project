import React, { useState, useEffect } from "react";
import { Table, Select, DatePicker, message, Button, Modal } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminQuickPaymentReports = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    status: "",
  });

  useEffect(() => {
    fetchPayments();
  }, [filters]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { startDate, endDate, status } = filters;
      const response = await axios.get("http://localhost:5000/api/quick-payment/all", {
        params: { startDate, endDate, status },
      });

      setPayments(response.data.payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      message.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setFilters({ ...filters, startDate: dates[0].format("YYYY-MM-DD"), endDate: dates[1].format("YYYY-MM-DD") });
    } else {
      setFilters({ ...filters, startDate: null, endDate: null });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/quick-payment/update-status/${id}`, {
        status: newStatus,
      });

      if (response.data.success) {
        message.success("Payment status updated successfully!");
        fetchPayments(); // Refresh data after update
      } else {
        message.error("Failed to update payment status.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      message.error("Error updating payment.");
    } finally {
      setUpdating(false);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("DD-MM-YYYY HH:mm"),
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId", // Changed from orderId to bookingId
      key: "bookingId",
      render: (text) => <span className="font-bold">#{text ? text.slice(-6) : "N/A"}</span>,
    },
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
      render: (text) => text ? <span className="text-green-600">{text}</span> : <span className="text-red-500">N/A</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₹${amount}`,
    },
    {
      title: "Payment Status",
      dataIndex: "status", // Ensure we're using the correct field
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 text-white font-semibold rounded-md ${
            status === "Success" ? "bg-green-500" : status === "Pending" ? "bg-yellow-500" : "bg-red-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Update Status",
      dataIndex: "_id", // Use _id as the data source for this column
      key: "updateStatus",
      render: (id, record) => (
        <Select
          value={record.status} // Use current status as value
          style={{ width: 120 }}
          onChange={(newStatus) => handleStatusChange(id, newStatus)}
          disabled={updating}
        >
          <Option value="Success">Success</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Failed">Failed</Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => setSelectedPayment(record)}>View</Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quick Payment Reports</h2>

      <div className="flex gap-4 mb-4">
        <RangePicker onChange={handleDateChange} />
        <Select 
          placeholder="Filter by Status" 
          onChange={(value) => setFilters({ ...filters, status: value })} 
          allowClear 
          className="w-48"
        >
          <Option value="Success">Success</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Failed">Failed</Option>
        </Select>
        <Button type="primary" onClick={fetchPayments}>Refresh</Button>
      </div>

      <Table 
        dataSource={payments} 
        columns={columns} 
        rowKey="_id" 
        loading={loading} 
        pagination={{ pageSize: 10 }} 
      />

      {/* View Payment Details Modal */}
      <Modal
        title="Payment Details"
        open={!!selectedPayment}
        onCancel={() => setSelectedPayment(null)}
        footer={null}
      >
        {selectedPayment && (
          <div>
            <p><strong>Booking ID:</strong> {selectedPayment.bookingId || "N/A"}</p>
            <p><strong>Payment ID:</strong> {selectedPayment.paymentId || "N/A"}</p>
            <p><strong>Name:</strong> {selectedPayment.name}</p>
            <p><strong>Email:</strong> {selectedPayment.email}</p>
            <p><strong>Mobile:</strong> {selectedPayment.mobile}</p>
            <p><strong>Amount:</strong> ₹{selectedPayment.amount}</p>
            <p><strong>Status:</strong> {selectedPayment.status}</p>
            <p><strong>Date:</strong> {moment(selectedPayment.createdAt).format("DD-MM-YYYY HH:mm")}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminQuickPaymentReports;