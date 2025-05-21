import React, { useState, useEffect } from "react";
import { Table, Select, DatePicker, message, Button, Modal, Descriptions, Tag, Space, Card, Divider } from "antd";
import { EyeOutlined, EditOutlined, ReloadOutlined, FilterOutlined } from "@ant-design/icons";
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
      const response = await axios.get("http://localhost:5001/api/quick-payment/all", {
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

  const handleStatusChange = async (newStatus) => {
    if (!selectedPayment) return;
    
    setUpdating(true);
    try {
      const response = await axios.put(`http://localhost:5001/api/quick-payment/update-status/${selectedPayment._id}`, {
        status: newStatus,
      });

      if (response.data.success) {
        message.success("Payment status updated successfully!");
        
        // Update the selected payment status locally
        setSelectedPayment({...selectedPayment, status: newStatus});
        
        // Update in the table data
        setPayments(payments.map(payment => 
          payment._id === selectedPayment._id ? {...payment, status: newStatus} : payment
        ));
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

  // Only show the most important columns in the table
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₹${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Success" ? "green" : 
            status === "Pending" ? "gold" : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />} 
            onClick={() => setSelectedPayment(record)}
          >
          </Button>
          <Button 
            type="default" 
            size="small" 
            icon={<EditOutlined />} 
            onClick={() => {
              setSelectedPayment(record);
            }}
          >
          </Button>
        </Space>
      ),
    },
  ];

  const getStatusColor = (status) => {
    return status === "Success" ? "green" : 
           status === "Pending" ? "gold" : "red";
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quick Payment Reports</h2>

      <Card className="mb-4">
        <Space size="large">
          <RangePicker 
            onChange={handleDateChange} 
            placeholder={["Start Date", "End Date"]}
          />
          <Select 
            placeholder="Filter by Status" 
            onChange={(value) => setFilters({ ...filters, status: value })} 
            allowClear 
            style={{ width: 150 }}
            suffixIcon={<FilterOutlined />}
          >
            <Option value="Success">Success</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Failed">Failed</Option>
          </Select>
          <Button type="primary" icon={<ReloadOutlined />} onClick={fetchPayments}>
            Refresh Data
          </Button>
        </Space>
      </Card>

      <Table 
        dataSource={payments} 
        columns={columns} 
        rowKey="_id" 
        loading={loading} 
        pagination={{ pageSize: 10 }}
        className=" black-bordered-table"
        bordered={true}
        // scroll={{ x: true }}
      
      />

      {/* Payment Details Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Payment Details</span>
            {selectedPayment && (
              <Tag color={getStatusColor(selectedPayment.status)} style={{ marginRight: 0 }}>
                {selectedPayment.status}
              </Tag>
            )}
          </div>
        }
        open={!!selectedPayment}
        onCancel={() => setSelectedPayment(null)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setSelectedPayment(null)}>
            Close
          </Button>
        ]}
      >
        {selectedPayment && (
          <>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Booking Date" span={2}>
                {moment(selectedPayment.createdAt).format("DD-MM-YYYY HH:mm:ss")}
              </Descriptions.Item>
              
              <Descriptions.Item label="Booking ID" span={2}>
                <strong>{selectedPayment.bookingId || "N/A"}</strong>
              </Descriptions.Item>
              
              <Descriptions.Item label="Payment ID" span={2}>
                {selectedPayment.paymentId || <span style={{ color: 'red' }}>Not Paid</span>}
              </Descriptions.Item>
              
              <Descriptions.Item label="Amount">₹{selectedPayment.amount}</Descriptions.Item>
              <Descriptions.Item label="Currency">{selectedPayment.currency || "INR"}</Descriptions.Item>
              
              <Descriptions.Item label="Name">{selectedPayment.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedPayment.email}</Descriptions.Item>
              
              <Descriptions.Item label="Mobile">{selectedPayment.mobile}</Descriptions.Item>
              <Descriptions.Item label="City">{selectedPayment.city || "N/A"}</Descriptions.Item>
              
              <Descriptions.Item label="ZIP Code">{selectedPayment.zip || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Remark">{selectedPayment.remark || "N/A"}</Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ marginRight: 10 }}>Update Payment Status:</span>
                <Select
                  value={selectedPayment.status}
                  style={{ width: 120 }}
                  onChange={handleStatusChange}
                  disabled={updating}
                >
                  <Option value="Success">Success</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Failed">Failed</Option>
                </Select>
              </div>
              
              {updating && <span>Updating...</span>}
            </div>
          </>
        )}
      </Modal>
      <style jsx>{`
        .table-row-light {
          background-color: #ffffff;
        }
        .table-row-dark {
          background-color: #fafafa;
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

export default AdminQuickPaymentReports;