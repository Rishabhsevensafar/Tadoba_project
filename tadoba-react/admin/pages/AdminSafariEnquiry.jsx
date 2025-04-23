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
  Row,
  Col,
  Descriptions,
  DatePicker,
  Tooltip,
  Timeline,
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
  DownloadOutlined,
  FilterOutlined,
  ClearOutlined,
  PlusOutlined,
  HistoryOutlined,
  FileTextFilled,
  FileTextOutlined,
} from "@ant-design/icons";
import moment from "moment";
import ManualEnquiryModal from "../components/ManuallyEnquiryModel";
import SafariVoucherModal from "../components/VoucherModel";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const AdminSafariEnquiries = () => {
  const [showManualEnquiryModal, setShowManualEnquiryModal] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [statusHistory, setStatusHistory] = useState([]);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [changeReason, setChangeReason] = useState("");
  const [voucherModalVisible, setVoucherModalVisible] = useState(false);
  const [voucherData, setVoucherData] = useState(null);

  // Filter states
  const [filterName, setFilterName] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateRange, setFilterDateRange] = useState(null);
  const [filterVehicleType, setFilterVehicleType] = useState("");
  const [filterSafariZone, setFilterSafariZone] = useState("");

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
    filterVehicleType,
    filterSafariZone,
  ]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/safarienquiry/"
      );

      if (response.data && Array.isArray(response.data.enquiries)) {
        const validEnquiries = response.data.enquiries
          .filter((item) => typeof item === "object" && item !== null)
          .map((item) => ({
            _id: item._id || Math.random().toString(),
            name: item.name || "N/A",
            email: item.email || "N/A",
            phone: item.phone || "N/A",
            vehicleType: item.vehicleType || "N/A",
            safariTime: item.safariTime || "N/A",
            date: item.date || null,
            safariZone: item.safariZone || "Unknown",
            childCount: typeof item.children === "number" ? item.children : 0,
            adults: typeof item.adults === "number" ? item.adults : 1,
            status: item.status || "Pending",
            remark: item.remark || "No Remark",
            device: item?.logDetails?.device || "N/A",
            browser: item?.logDetails?.browser || "N/A",
            ip: item?.logDetails?.ip || "N/A",
            statusHistory: item.statusHistory || [],
            createdAt: item.createdAt || new Date().toISOString(),
          }));

        setEnquiries(validEnquiries);
        setFilteredData(validEnquiries);
      } else {
        setEnquiries([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching safari enquiries:", error);
      setEnquiries([]);
      setFilteredData([]);
      message.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const fetchStatusHistory = async (enquiryId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/safarienquiry/status-history/${enquiryId}`
      );
      setStatusHistory(response.data.statusHistory || []);
      setHistoryModalVisible(true);
    } catch (error) {
      console.error("Error fetching status history:", error);
      message.error("Failed to load status history");
    }
  };

  const showModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setRemark(enquiry.remark || "");
    setStatus(enquiry.status || "Pending");
    setChangeReason("");
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUpdateEnquiry = async () => {
    try {
      const updateData = {
        status,
        remark: `${changeReason ? changeReason + ": " : ""}${remark}`,
      };

      await axios.put(
        `http://localhost:5000/api/safarienquiry/update-status/${selectedEnquiry._id}`,
        updateData
      );
      message.success("Safari enquiry updated successfully!");
      fetchEnquiries();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating safari enquiry:", error);
      message.error("Failed to update safari enquiry");
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/safarienquiry/${id}`);
      message.success("Safari enquiry deleted successfully!");
      fetchEnquiries();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error deleting safari enquiry:", error);
      message.error("Failed to delete safari enquiry");
    }
  };
  const openVoucherModal = (enquiry) => {
    setVoucherData(enquiry);
    setVoucherModalVisible(true);
  };
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

    if (filterVehicleType) {
      results = results.filter((item) =>
        item.vehicleType.toLowerCase().includes(filterVehicleType.toLowerCase())
      );
    }

    if (filterSafariZone) {
      results = results.filter((item) =>
        item.safariZone.toLowerCase().includes(filterSafariZone.toLowerCase())
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

  const clearFilters = () => {
    setFilterName("");
    setFilterEmail("");
    setFilterPhone("");
    setFilterStatus("");
    setFilterDateRange(null);
    setFilterVehicleType("");
    setFilterSafariZone("");
  };

  const getStatusInfo = (status) => {
    if (!status)
      return { color: "red", icon: <HourglassOutlined />, text: "Pending" };

    switch (status) {
      case "Pending":
        return {
          color: "red",
          icon: <HourglassOutlined />,
          text: "Pending",
        };
      case "Success":
        return {
          color: "green",
          icon: <CheckCircleOutlined />,
          text: "Success",
        };
      case "Not Interested":
        return {
          color: "orange",
          icon: <CloseCircleOutlined />,
          text: "Not Interested",
        };
      case "No Response":
        return {
          color: "gray",
          icon: <QuestionCircleOutlined />,
          text: "No Response",
        };
      default:
        return {
          color: "blue",
          icon: <TagOutlined />,
          text: status,
        };
    }
  };

  const downloadCSV = () => {
    const csvColumns = [
      "Date & Time",
      "Name",
      "Phone",
      "Email",
      "Vehicle Type",
      "Safari Time",
      "Safari Zone",
      "Safari Date",
      "Children",
      "Adults",
      "Remark",
      "Status",
      "Status History Count",
    ];

    const csvData = filteredData.map((item) => ({
      "Date & Time": moment(item.createdAt).format("DD-MM-YYYY hh:mm A"),
      Name: item.name,
      Phone: item.phone,
      Email: item.email,
      "Vehicle Type": item.vehicleType,
      "Safari Time": item.safariTime,
      "Safari Zone": item.safariZone,
      "Safari Date": item.date
        ? moment(item.date).format("DD-MM-YYYY")
        : "Not specified",
      Children: item.childCount || 0,
      Adults: item.adults || 0,
      Remark: item.remark || "No Remark",
      Status: item.status || "Pending",
      "Status History Count": item.statusHistory?.length || 0,
    }));

    const header = csvColumns.join(",");
    const rows = csvData.map((row) =>
      csvColumns
        .map((col) => {
          let value = row[col] || "";
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

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `safari_enquiries_${moment().format("YYYY-MM-DD")}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("CSV file has been downloaded");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        if (!a.name || !b.name) return 0;
        return a.name.localeCompare(b.name);
      },
      render: (text) => <Text strong>{text || "N/A"}</Text>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <Text>
          {createdAt ? moment(createdAt).format("DD-MM-YYYY hh:mm A") : "N/A"}
        </Text>
      ),
      sorter: (a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(a.createdAt) - new Date(b.createdAt);
      },
    },
    {
      title: "Safari Date",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <Text>
          {date ? moment(date).format("DD-MM-YYYY") : "Not specified"}
        </Text>
      ),
      sorter: (a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(a.date) - new Date(b.date);
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "N/A",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
      render: (text) => text || "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text || "N/A",
    },
    {
      title: "Remark",
      key: "remark",
      dataIndex: "remark",
      render: (text) => text || "No Remark",
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
          <Tooltip title="View Details">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Tooltip title="View History">
            <Button
              type="default"
              icon={<HistoryOutlined />}
              onClick={() => fetchStatusHistory(record._id)}
            />
          </Tooltip>
          <Tooltip title="Generate Voucher">
            <Button
              icon={<FileTextOutlined />}
              onClick={() => openVoucherModal(record)}
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
          <TagOutlined /> Safari Enquiries Management
        </Title>
      }
      extra={
        <Space>
          <Button
            type="primary"
            onClick={() => setShowManualEnquiryModal(true)}
            icon={<PlusOutlined />}
          >
            Add Enquiry
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
                  <Option value="Pending">Pending</Option>
                  <Option value="Success">Success</Option>
                  <Option value="Not Interested">Not Interested</Option>
                  <Option value="No Response">No Response</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item label="Vehicle Type" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Filter by vehicle type"
                  value={filterVehicleType}
                  onChange={(e) => setFilterVehicleType(e.target.value)}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Form.Item label="Safari Zone" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Filter by safari zone"
                  value={filterSafariZone}
                  onChange={(e) => setFilterSafariZone(e.target.value)}
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

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record._id || Math.random().toString()}
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
      </div>

      {/* Detailed Modal with all information and actions */}
      <Modal
        title={
          <Space>
            <EyeOutlined />
            <span>Safari Enquiry Details</span>
          </Space>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Popconfirm
            key="delete"
            title="Are you sure you want to delete this safari enquiry?"
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
                {selectedEnquiry.name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>
                {selectedEnquiry.email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedEnquiry.phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Children">
                {selectedEnquiry?.childCount ?? 0}
              </Descriptions.Item>
              <Descriptions.Item label="Adults">
                {selectedEnquiry?.adults ?? 0}
              </Descriptions.Item>
              <Descriptions.Item label="Device">
                {selectedEnquiry.device || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Browser">
                {selectedEnquiry.browser || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="IP Address" span={2}>
                {selectedEnquiry.ip || "N/A"}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title="Enquiry Details"
              bordered
              column={{ xs: 1, sm: 2 }}
              style={{ marginBottom: "24px" }}
            >
              <Descriptions.Item label="Safari Date">
                {selectedEnquiry.date
                  ? moment(selectedEnquiry.date).format("DD-MM-YYYY")
                  : "Not specified"}
              </Descriptions.Item>
              <Descriptions.Item label="Safari Time" span={2}>
                {selectedEnquiry.safariTime || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Safari Zone" span={1}>
                {selectedEnquiry.safariZone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Vehicle Type" span={2}>
                {selectedEnquiry.vehicleType || "N/A"}
              </Descriptions.Item>
              {selectedEnquiry.message && (
                <Descriptions.Item label="Message" span={2}>
                  {selectedEnquiry.message}
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Current Status">
                <Tag color={getStatusInfo(selectedEnquiry.status).color}>
                  {selectedEnquiry.status || "Pending"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Current Remark">
                {selectedEnquiry.remark || "No remark added"}
              </Descriptions.Item>
            </Descriptions>

            <Divider style={{ margin: "16px 0" }} />

            <Title level={5} style={{ marginBottom: 16 }}>
              <HistoryOutlined /> Status History
            </Title>

            <Timeline>
              {(selectedEnquiry.statusHistory || []).map((entry, index) => (
                <Timeline.Item
                  key={index}
                  color={getStatusInfo(entry.status).color}
                  dot={getStatusInfo(entry.status).icon}
                >
                  <p>
                    <strong>{getStatusInfo(entry.status).text}</strong>
                    <br />
                    {entry.remark && <small>Remark: {entry.remark}</small>}
                    <br />
                    <small>
                      {moment(entry.changedAt).format("DD-MM-YYYY hh:mm A")}
                    </small>
                  </p>
                </Timeline.Item>
              ))}
            </Timeline>

            <Divider style={{ margin: "16px 0" }} />

            <Form layout="vertical">
              <Form.Item label="Update Status" required>
                <Select
                  value={status}
                  onChange={(value) => setStatus(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="Pending">
                    <Badge status="error" text="Pending" />
                  </Option>
                  <Option value="Success">
                    <Badge status="success" text="Success" />
                  </Option>
                  <Option value="Not Interested">
                    <Badge status="warning" text="Not Interested" />
                  </Option>
                  <Option value="No Response">
                    <Badge status="default" text="No Response" />
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
                  placeholder="Enter your remark or notes about this safari enquiry"
                  showCount
                  maxLength={500}
                />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>

      {/* Status History Modal */}
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

      <style jsx global>{`
        .table-row-light {
          background-color: #ffffff;
        }
        .table-row-dark {
          background-color: #fafafa;
        }
        .table-container {
          overflow-x: auto;
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

        .black-bordered-table
          .ant-table-column-sort
          .ant-table-column-sorter-up.active,
        .black-bordered-table
          .ant-table-column-sort
          .ant-table-column-sorter-down.active {
          color: #ff4d4f;
        }
      `}</style>

      <ManualEnquiryModal
        visible={showManualEnquiryModal}
        onCancel={() => setShowManualEnquiryModal(false)}
        refreshEnquiries={fetchEnquiries}
      />
      <SafariVoucherModal
        visible={voucherModalVisible}
        onClose={() => setVoucherModalVisible(false)}
        enquiry={voucherData}
      />
    </Card>
  );
};

export default AdminSafariEnquiries;
