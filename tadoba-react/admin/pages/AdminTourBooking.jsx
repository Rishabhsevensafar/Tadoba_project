import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Tag, message, Popconfirm } from "antd";
import moment from "moment";

const AdminTourBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/bookings");
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { paymentStatus: newStatus });
      message.success("Booking status updated!");
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
    }
  };

  const columns = [
    {
      title: "Customer Name",   
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Package",
      dataIndex: ["package", "title"],
      key: "package",
    },
    {
      title: "Hotel",
      dataIndex: ["hotel", "title"],
      key: "hotel",
    },
    {
      title: "Check-In",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Check-Out",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        const color = status === "paid" ? "green" : status === "pending" ? "red" : "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        record.paymentStatus !== "paid" ? (
          <Popconfirm
            title="Mark as Paid?"
            onConfirm={() => updateBookingStatus(record._id, "paid")}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Mark as Paid</Button>
          </Popconfirm>
        ) : (
          <Tag color="green">Paid</Tag>
        )
      ),
    },
  ];
  

  return (
    <div>
      <h2>Booking Reports</h2>
      <Table columns={columns} dataSource={bookings} rowKey="_id" loading={loading} />
    </div>
  );
};

export default AdminTourBookings;
