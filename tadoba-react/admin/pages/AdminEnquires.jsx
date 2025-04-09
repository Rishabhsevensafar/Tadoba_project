import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  Typography,
  Card,
  Badge,
  message,
  Divider,
  Popconfirm,
  Descriptions,
  Tooltip,
  Row,
  Col,
  DatePicker,
} from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HourglassOutlined,
  QuestionCircleOutlined,
  TagOutlined,
  DeleteOutlined,
  ReloadOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  DownloadOutlined,
  FilterOutlined,
  ClearOutlined,
  PlusOutlined,
  HistoryOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import moment from "moment";
import ManualHotelEnquiryModal from "../components/ManualHotelEnquiryModel";
import HotelVoucherModal from "../components/ModelHotelVoucher";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminHotelEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [statusHistory, setStatusHistory] = useState([]);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [changeReason, setChangeReason] = useState("");
  const [hotelVoucherVisible, setHotelVoucherVisible] = useState(false);
  const [voucherEnquiry, setVoucherEnquiry] = useState(null);

  // Filter states
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateRange, setFilterDateRange] = useState(null);
  const [filterHotel, setFilterHotel] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    enquiries,
    filterName,
    filterEmail,
    filterPhone,
    filterStatus,
    filterDateRange,
    filterHotel,
  ]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/hotelenquiry"
      );
      setEnquiries(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      message.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  // Function to get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          color: "red",
          icon: <HourglassOutlined />,
          text: "Pending",
        };
      case "resolved":
        return {
          color: "green",
          icon: <CheckCircleOutlined />,
          text: "Resolved",
        };
      case "rejected":
        return {
          color: "orange",
          icon: <CloseCircleOutlined />,
          text: "Rejected",
        };
      default:
        return {
          color: "blue",
          icon: <TagOutlined />,
          text: status,
        };
    }
  };

  const showModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setRemark(enquiry.remark || "");
    setStatus(enquiry.status);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // Add this function to fetch status history
  const fetchStatusHistory = async (enquiryId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hotelenquiry/status-history/${enquiryId}`
      );
      setStatusHistory(response.data.statusHistory || []);
      setHistoryModalVisible(true);
    } catch (error) {
      console.error("Error fetching status history:", error);
      message.error("Failed to load status history");
    }
  };
  // Update the handleUpdateEnquiry function
  const handleUpdateEnquiry = async () => {
    try {
      const updateData = {
        status,
        remark: `${changeReason ? changeReason + ": " : ""}${remark}`,
      };

      if (status && status !== selectedEnquiry.status) {
        await axios.put(
          `http://localhost:5000/api/hotelenquiry/${selectedEnquiry._id}/status`,
          updateData
        );
        message.success("Status updated successfully!");
      } else if (remark && remark !== selectedEnquiry.remark) {
        await axios.put(
          `http://localhost:5000/api/hotelenquiry/${selectedEnquiry._id}/remark`,
          { remark }
        );
        message.success("Remark updated successfully!");
      }

      fetchEnquiries(); // Refresh data after update
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating enquiry:", error);
      message.error("Failed to update enquiry");
    }
  };
  const handleDeleteEnquiry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/hotelenquiry/${id}`);
      message.success("Enquiry deleted successfully!");
      fetchEnquiries();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      message.error("Failed to delete enquiry");
    }
  };
  const openHotelVoucherModal = (enquiry) => {
    setVoucherEnquiry(enquiry);
    setHotelVoucherVisible(true);
  };
  // Apply filters to the data
  const applyFilters = () => {
    let results = [...enquiries];

    if (filterName) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterEmail) {
      results = results.filter((item) =>
        item.email.toLowerCase().includes(filterEmail.toLowerCase())
      );
    }

    if (filterPhone) {
      results = results.filter((item) => item.phone.includes(filterPhone));
    }

    if (filterStatus) {
      results = results.filter((item) => item.status === filterStatus);
    }

    if (filterHotel) {
      results = results.filter(
        (item) =>
          item.hotelId &&
          item.hotelId.title &&
          item.hotelId.title.toLowerCase().includes(filterHotel.toLowerCase())
      );
    }

    if (filterDateRange && filterDateRange[0] && filterDateRange[1]) {
      const startDate = filterDateRange[0].startOf("day");
      const endDate = filterDateRange[1].endOf("day");

      results = results.filter((item) => {
        const itemDate = moment(item.createdAt);
        return (
          itemDate.isSameOrAfter(startDate) && itemDate.isSameOrBefore(endDate)
        );
      });
    }

    setFilteredData(results);
  };

  // Reset all filters
  const clearFilters = () => {
    setFilterName("");
    setFilterEmail("");
    setFilterPhone("");
    setFilterStatus("");
    setFilterHotel("");
    setFilterDateRange(null);
  };

  // Download CSV function
  const downloadCSV = () => {
    // Define which columns to include in the CSV
    const csvColumns = [
      "Date & Time",
      "Name",
      "Email",
      "Phone Number",
      "Hotel Name",
      "Message",
      "Remark",
      "Status",
    ];

    // Format data for CSV
    const csvData = filteredData.map((item) => ({
      "Date & Time": moment(item.createdAt).format("DD-MM-YYYY hh:mm A"),
      Name: item.name,
      Email: item.email,
      "Phone Number": item.phone,
      "Hotel Name": item.hotelId?.title || "N/A",
      Message: item.message,
      Remark: item.remark || "N/A",
      Status: getStatusInfo(item.status).text,
    }));

    // Convert to CSV format
    const header = csvColumns.join(",");
    const rows = csvData.map((row) =>
      csvColumns
        .map((col) => {
          let value = row[col] || "";
          // Escape commas and quotes
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            value = `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",")
    );

    const csv = [header, ...rows].join("\n");

    // Create and download the file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `hotel_enquiries_${moment().format("YYYY-MM-DD")}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("CSV file has been downloaded");
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Text>{moment(createdAt).format("DD-MM-YYYY hh:mm A")}</Text>
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hotel Name",
      dataIndex: ["hotelId", "title"],
      key: "hotel",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Remark",
      dataIndex: "remark",
      key: "remark",
      render: (remark) => <Text>{remark ? remark : "No remark added"}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const { color, icon, text } = getStatusInfo(status);
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => showModal(record)}
          />
          <Button
            type="default"
            icon={<HistoryOutlined />}
            onClick={() => fetchStatusHistory(record._id)}
          />
          <Tooltip title="Generate Voucher">
            <Button
              icon={<FileTextOutlined />}
              onClick={() => openHotelVoucherModal(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <Title level={4} style={{ margin: 0 }}>
          <HomeOutlined /> Hotel Enquiries Management
        </Title>
      }
      extra={
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowManualModal(true)}
          >
            Add Manual Enquiry
          </Button>
          <Tooltip title="Toggle Filter Panel">
            <Button
              type={isFilterVisible ? "primary" : "default"}
              icon={<FilterOutlined />}
              onClick={() => setIsFilterVisible(!isFilterVisible)}
            >
              Filter
            </Button>
          </Tooltip>
          <Tooltip title="Download as CSV">
            <Button
              icon={<DownloadOutlined />}
              onClick={downloadCSV}
              disabled={filteredData.length === 0}
            >
              Export CSV
            </Button>
          </Tooltip>
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchEnquiries}
            loading={loading}
          >
            Refresh
          </Button>
        </Space>
      }
      style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
    >
      {/* Filter Panel */}
      {isFilterVisible && (
        <Card
          size="small"
          style={{ marginBottom: 16, background: "#f9f9f9" }}
          title="Filter Options"
          extra={
            <Button
              icon={<ClearOutlined />}
              onClick={clearFilters}
              size="small"
            >
              Clear Filters
            </Button>
          }
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item label="Name" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Filter by name"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item label="Email" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Filter by email"
                  value={filterEmail}
                  onChange={(e) => setFilterEmail(e.target.value)}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item label="Phone" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Filter by phone"
                  value={filterPhone}
                  onChange={(e) => setFilterPhone(e.target.value)}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item label="Status" style={{ marginBottom: 0 }}>
                <Select
                  placeholder="Filter by status"
                  value={filterStatus}
                  onChange={(value) => setFilterStatus(value)}
                  allowClear
                  style={{ width: "100%" }}
                >
                  <Option value="pending">Pending</Option>
                  <Option value="resolved">Resolved</Option>
                  <Option value="rejected">Rejected</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item label="Hotel" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Filter by hotel name"
                  value={filterHotel}
                  onChange={(e) => setFilterHotel(e.target.value)}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Date Range" style={{ marginBottom: 0 }}>
                <RangePicker
                  value={filterDateRange}
                  onChange={(dates) => setFilterDateRange(dates)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      )}

      {/* Results Info */}
      <div style={{ marginBottom: 16 }}>
        <Text type="secondary">
          {filteredData.length === enquiries.length
            ? `Showing all ${filteredData.length} enquiries`
            : `Found ${filteredData.length} matching enquiries out of ${enquiries.length} total`}
        </Text>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} enquiries`,
        }}
        bordered
        size="middle"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        className="black-bordered-table"
      />

      {/* Detailed Modal with all information and actions */}
      <Modal
        title={
          <Space>
            <EyeOutlined />
            <span>Enquiry Details</span>
          </Space>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            key="delete"
            title="Are you sure you want to delete this enquiry?"
            onConfirm={() => handleDeleteEnquiry(selectedEnquiry?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete Enquiry
            </Button>
          </Popconfirm>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handleUpdateEnquiry}
          >
            Save Changes
          </Button>,
        ]}
        width={700}
      >
        {selectedEnquiry && (
          <div className="black-bordered-descriptions">
            <Descriptions
              title="Customer Information"
              bordered
              column={{ xs: 1, sm: 2 }}
              style={{ marginBottom: "24px" }}
            >
              <Descriptions.Item label="Customer Name">
                <UserOutlined className="mr-2" /> {selectedEnquiry.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined className="mr-2" /> {selectedEnquiry.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined className="mr-2" /> {selectedEnquiry.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Hotel">
                <HomeOutlined className="mr-2" />{" "}
                {selectedEnquiry.hotelId?.title || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title="Enquiry Details"
              bordered
              column={1}
              style={{ marginBottom: "24px" }}
            >
              <Descriptions.Item label="Message">
                {selectedEnquiry.message}
              </Descriptions.Item>
              <Descriptions.Item label="Current Status">
                {selectedEnquiry.status && (
                  <Tag color={getStatusInfo(selectedEnquiry.status).color}>
                    {getStatusInfo(selectedEnquiry.status).text}
                  </Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Current Remark">
                {selectedEnquiry.remark || "No remark added"}
              </Descriptions.Item>
            </Descriptions>
            <Divider style={{ margin: "16px 0" }} />
            <Form layout="vertical">
              <Form.Item label="Update Status" required>
                <Select
                  value={status}
                  onChange={(value) => setStatus(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="pending">
                    <Badge status="error" text="Pending" />
                  </Option>
                  <Option value="resolved">
                    <Badge status="success" text="Resolved" />
                  </Option>
                  <Option value="rejected">
                    <Badge status="warning" text="Rejected" />
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item label="Status Change Reason" required>
                <Select
                  value={changeReason}
                  onChange={(value) => setChangeReason(value)}
                  style={{ width: "100%" }}
                  placeholder="Select reason for status change"
                >
                  <Option value="Customer Confirmed">Customer Confirmed</Option>
                  <Option value="No Response">No Response</Option>
                  <Option value="Call Later">Call Later</Option>
                  <Option value="Not Interested">Not Interested</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Update Remark">
                <TextArea
                  rows={4}
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter your remark or notes about this enquiry"
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Form>
          </div>
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
          background-color: #2c5f2d !important;
          color: #fff !important;
        }
        .black-bordered-table th {
          background-color: #2c5f2d !important;
          color: #fff !important;
        }
        .black-bordered-table .ant-table-column-sorter {
          color: #fffff;
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
          color: #ff4d4f; /* Active sorter icon का color */
        }
      `}</style>
      <ManualHotelEnquiryModal
        visible={showManualModal}
        onCancel={() => setShowManualModal(false)}
        refreshEnquiries={fetchEnquiries}
        hotels={hotels}
      />
      <Modal
        title="Status History"
        open={historyModalVisible}
        onCancel={() => setHistoryModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setHistoryModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <Table
          columns={[
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (status) => {
                const { color, icon, text } = getStatusInfo(status);
                return (
                  <Tag color={color} icon={icon}>
                    {text}
                  </Tag>
                );
              },
            },
            {
              title: "Remark",
              dataIndex: "remark",
              key: "remark",
              render: (text) => text || "No remark",
            },
            {
              title: "Changed At",
              dataIndex: "changedAt",
              key: "changedAt",
              render: (date) => moment(date).format("DD-MM-YYYY hh:mm A"),
            },
          ]}
          dataSource={statusHistory}
          rowKey={(record) => record._id || record.changedAt}
          pagination={false}
        />
      </Modal>
      <HotelVoucherModal
  visible={hotelVoucherVisible}
  onClose={() => setHotelVoucherVisible(false)}
  enquiry={voucherEnquiry}
/>

    </Card>
  );
};
export default AdminHotelEnquiries;
