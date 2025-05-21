import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllHotelsForDropdown, getHotelPackageById } from "../service/api";
import {
  Form,
  Input,
  Button,
  Upload,
  InputNumber,
  DatePicker,
  Modal,
  Space,
  Divider,
  List,
  Typography,
  Card,
  Row,
  Col,
  Tooltip,
  Select,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  UploadOutlined,
  CalendarOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  FileTextOutlined,
  PictureOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  OrderedListOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const { Option } = Select;

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const containerStyle = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  width: "100%",
  maxWidth: "800px",
  maxHeight: "90vh",
  overflow: "auto",
};

const headerStyle = {
  padding: "16px 24px",
  borderBottom: "1px solid #f0f0f0",
  display: "flex",
  alignItems: "center",
};

const contentStyle = {
  padding: "24px",
};

const footerStyle = {
  padding: "10px 24px",
  borderTop: "1px solid #f0f0f0",
  textAlign: "right",
};

const PackageForm = ({ onClose, fetchPackages, selectedPackage }) => {
  const [form] = Form.useForm();
  const [includes, setIncludes] = useState([]);
  const [excludes, setExcludes] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [newIncludes, setNewIncludes] = useState("");
  const [newExcludes, setNewExcludes] = useState("");
  const [newItineraryEntry, setNewItineraryEntry] = useState({
    title: "",
    activities: "",
    image: null,
  });
  const [fileList, setFileList] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [hotels, setHotels] = useState([]); // Store hotel list for dropdown
  const [selectedHotels, setSelectedHotels] = useState([]); // Store selected hotel IDs
  const [selectedHotelNames, setSelectedHotelNames] = useState([]); // Store selected hotel names

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (selectedPackage) {
      form.setFieldsValue({
        title: selectedPackage.title,
        description: selectedPackage.description,
        price: selectedPackage.price,
        location: selectedPackage.location,
        duration: selectedPackage.duration,
        totalSeats: selectedPackage.totalSeats,
        dateRange:
          selectedPackage.startDate && selectedPackage.endDate
            ? [
                moment(selectedPackage.startDate),
                moment(selectedPackage.endDate),
              ]
            : undefined,
      });

      // Handle existing images
      const existingImages =
        selectedPackage.images?.map((img, index) => ({
          uid: `-${index}`,
          name: `image-${index}`,
          status: "done",
          url: typeof img === "string" ? img : URL.createObjectURL(img),
          originFileObj: img instanceof File ? img : null,
        })) || [];

      setFileList(existingImages);
      setIncludes(selectedPackage.includes || []);
      setExcludes(selectedPackage.excludes || []);
      setItinerary(
        (selectedPackage.itinerary || []).map((entry) => ({
          ...entry,
          image: entry.image || null,
        }))
      );
      
    } else {
      form.resetFields();
      setFileList([]);
      setIncludes([]);
      setExcludes([]);
      setItinerary([]);
    }
  }, [selectedPackage, form]);
  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await getAllHotelsForDropdown();
      setHotels(response.data.hotels);
    } catch (error) {
      message.error("Failed to load hotels");
    }
  };

  const handleHotelSelect = (hotelIds) => {
    setSelectedHotels(hotelIds);
    const selectedNames = hotels
      .filter((hotel) => hotelIds.includes(hotel._id))
      .map((hotel) => hotel.title);
    setSelectedHotelNames(selectedNames);
  };

  const handleRemoveHotel = (hotelId) => {
    const updatedHotels = selectedHotels.filter((id) => id !== hotelId);
    setSelectedHotels(updatedHotels);
    setSelectedHotelNames(
      selectedHotelNames.filter((_, index) => selectedHotels[index] !== hotelId)
    );
  };
  const handleAddIncludes = () => {
    if (newIncludes.trim()) {
      setIncludes([...includes, newIncludes]);
      setNewIncludes("");
    }
  };

  const handleAddExcludes = () => {
    if (newExcludes.trim()) {
      setExcludes([...excludes, newExcludes]);
      setNewExcludes("");
    }
  };

  const handleAddItinerary = () => {
    if (newItineraryEntry.title && newItineraryEntry.activities) {
      setItinerary([
        ...itinerary,
        {
          day: `Day ${itinerary.length + 1}`,
          title: newItineraryEntry.title,
          activities: newItineraryEntry.activities,
          image: newItineraryEntry.image,
        },
      ]);
      setNewItineraryEntry({ title: "", activities: "" });
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();

      const packageData = new FormData(); // ✅ Correct initialization

      // ✅ Append form fields
      packageData.append("title", values.title);
      packageData.append("description", values.description);
      packageData.append("price", values.price);
      packageData.append("location", values.location);
      packageData.append("duration", values.duration);
      packageData.append("totalSeats", values.totalSeats);

      if (values.dateRange && values.dateRange.length === 2) {
        packageData.append(
          "startDate",
          values.dateRange[0].format("YYYY-MM-DD")
        );
        packageData.append("endDate", values.dateRange[1].format("YYYY-MM-DD"));
      }

      // ✅ Append images
      fileList.forEach((file) => {
        if (file.originFileObj) {
          packageData.append("images", file.originFileObj);
        }
      });

      // ✅ Send hotels as an actual array (NOT a string)
      console.log("Selected Hotels Before Sending:", selectedHotels);
      selectedHotels.forEach((id) => packageData.append("hotels[]", id));

      // ✅ Append itinerary, includes, excludes as JSON strings
      // Append itinerary data and their image files
      itinerary.forEach((item, index) => {
        packageData.append(`itinerary[${index}][title]`, item.title);
        packageData.append(`itinerary[${index}][activities]`, item.activities);
        if (item.image) {
          packageData.append(`itineraryImages`, item.image); // field name should match Multer field
        }
      });

      packageData.append("includes", JSON.stringify(includes));
      packageData.append("excludes", JSON.stringify(excludes));

      // ✅ Determine whether to create or update the package
      if (selectedPackage) {
        await axios.put(
          `http://localhost:5001/api/tourpackage/${selectedPackage._id}`,
          packageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        Modal.success({
          title: "Success",
          content: "Package updated successfully!",
        });
      } else {
        await axios.post(
          "http://localhost:5001/api/tourpackage/create",
          packageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        Modal.success({
          title: "Success",
          content: "Package created successfully!",
        });
      }

      fetchPackages();
      onClose();
    } catch (error) {
      console.error("Error saving package:", error);
      Modal.error({
        title: "Error",
        content: "Failed to save package. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([
        ...fileList,
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
          originFileObj: file,
        },
      ]);
      return false;
    },
    fileList,
  };

  return (
    <div style={modalStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <Title level={4} style={{ margin: 0 }}>
            {selectedPackage ? (
              <>
                <EditOutlined /> Edit Package
              </>
            ) : (
              <>
                <PlusOutlined /> Add Package
              </>
            )}
          </Title>
        </div>

        <div style={contentStyle}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="title"
              label={
                <Space>
                  <FileTextOutlined />
                  <span>Package Title</span>
                </Space>
              }
              rules={[
                { required: true, message: "Please enter package title" },
              ]}
            >
              <Input placeholder="Enter package title" />
            </Form.Item>

            <Form.Item
              name="description"
              label={
                <Space>
                  <InfoCircleOutlined />
                  <span>Description</span>
                </Space>
              }
              rules={[
                { required: true, message: "Please enter package description" },
              ]}
            >
              <TextArea rows={4} placeholder="Enter package description" />
            </Form.Item>

            <Form.Item
              label={
                <Space>
                  <PictureOutlined />
                  <span>Package Images</span>
                </Space>
              }
            >
              <Upload {...uploadProps} listType="picture-card" multiple>
                <div>
                  <UploadOutlined style={{ fontSize: "24px" }} />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
              <Text type="secondary">
                Upload high-quality images of the destination
              </Text>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label={
                    <Space>
                      <DollarOutlined />
                      <span>Price</span>
                    </Space>
                  }
                  rules={[{ required: true, message: "Required" }]}
                >
                  <InputNumber
                    min={0}
                    style={{ width: "100%" }}
                    placeholder="Enter price"
                    formatter={(value) =>
                      `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\₹\s?|(,*)/g, "")}
                    prefix={<DollarOutlined />}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="duration"
                  label={
                    <Space>
                      <FieldTimeOutlined />
                      <span>Duration</span>
                    </Space>
                  }
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    placeholder="E.g., 5 days & 4 nights"
                    prefix={<FieldTimeOutlined />}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="location"
              label={
                <Space>
                  <span role="img" aria-label="location">
                    📍
                  </span>
                  <span>Location</span>
                </Space>
              }
              rules={[
                { required: true, message: "Please enter package location" },
              ]}
            >
              <Input placeholder="Enter destination location" />
            </Form.Item>

            <Form.Item
              name="dateRange"
              label={
                <Space>
                  <CalendarOutlined />
                  <span>Package Dates</span>
                </Space>
              }
              rules={[
                { required: true, message: "Please select package dates" },
              ]}
            >
              <RangePicker
                style={{ width: "100%" }}
                format="DD MMM YYYY"
                placeholder={["Start Date", "End Date"]}
              />
            </Form.Item>
            {/* ✅ Hotel Dropdown */}
            {/* ✅ Multi-Select Hotel Dropdown */}
            <Form.Item label="Select Hotels for Package">
              <Select
                mode="multiple"
                placeholder="Choose hotels"
                onChange={handleHotelSelect}
                value={selectedHotels}
              >
                {hotels.map((hotel) => (
                  <Option key={hotel._id} value={hotel._id}>
                    {hotel.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* ✅ Display Selected Hotels */}
            {selectedHotelNames.length > 0 && (
              <List
                size="small"
                bordered
                dataSource={selectedHotelNames}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <Tooltip title="Remove">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            handleRemoveHotel(selectedHotels[index])
                          }
                        />
                      </Tooltip>,
                    ]}
                  >
                    {item}
                  </List.Item>
                )}
              />
            )}

            <Form.Item
              name="totalSeats"
              label={
                <Space>
                  <TeamOutlined />
                  <span>Total Seats</span>
                </Space>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter total available seats",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Divider>
              <Space>
                <CheckCircleOutlined />
                <span>What's Included</span>
              </Space>
            </Divider>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={newIncludes}
                onChange={(e) => setNewIncludes(e.target.value)}
                placeholder="Add an inclusion (e.g., Breakfast, WiFi)"
                onPressEnter={handleAddIncludes}
                prefix={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              />
              <Tooltip title="Add Inclusion">
                <Button
                  type="primary"
                  onClick={handleAddIncludes}
                  icon={<PlusOutlined />}
                >
                  Add
                </Button>
              </Tooltip>
            </Space.Compact>

            <List
              size="small"
              bordered
              style={{
                marginTop: 16,
                marginBottom: 24,
                backgroundColor: "#f6ffed",
              }}
              dataSource={includes}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Tooltip title="Remove">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          setIncludes(includes.filter((_, i) => i !== index))
                        }
                      />
                    </Tooltip>,
                  ]}
                >
                  <Space>
                    <CheckCircleOutlined style={{ color: "#52c41a" }} />
                    {item}
                  </Space>
                </List.Item>
              )}
              locale={{ emptyText: "No inclusions added yet" }}
            />

            <Divider>
              <Space>
                <CloseCircleOutlined />
                <span>What's Excluded</span>
              </Space>
            </Divider>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={newExcludes}
                onChange={(e) => setNewExcludes(e.target.value)}
                placeholder="Add an exclusion (e.g., Airport transfers, Tips)"
                onPressEnter={handleAddExcludes}
                prefix={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
              />
              <Tooltip title="Add Exclusion">
                <Button
                  type="primary"
                  onClick={handleAddExcludes}
                  icon={<PlusOutlined />}
                  danger
                >
                  Add
                </Button>
              </Tooltip>
            </Space.Compact>

            <List
              size="small"
              bordered
              style={{
                marginTop: 16,
                marginBottom: 24,
                backgroundColor: "#fff1f0",
              }}
              dataSource={excludes}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Tooltip title="Remove">
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          setExcludes(excludes.filter((_, i) => i !== index))
                        }
                      />
                    </Tooltip>,
                  ]}
                >
                  <Space>
                    <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
                    {item}
                  </Space>
                </List.Item>
              )}
              locale={{ emptyText: "No exclusions added yet" }}
            />

            <Divider>
              <Space>
                <OrderedListOutlined />
                <span>Itinerary</span>
              </Space>
            </Divider>
            <Card
              size="small"
              style={{ marginBottom: 16 }}
              title={
                <Space>
                  <CalendarOutlined />
                  <span>Add Day to Itinerary</span>
                </Space>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input
                  placeholder="Day title (e.g., Arrival and Welcome Dinner)"
                  value={newItineraryEntry.title}
                  onChange={(e) =>
                    setNewItineraryEntry({
                      ...newItineraryEntry,
                      title: e.target.value,
                    })
                  }
                  prefix={<FileTextOutlined />}
                />
                <TextArea
                  rows={2}
                  placeholder="Day activities and details"
                  value={newItineraryEntry.activities}
                  onChange={(e) =>
                    setNewItineraryEntry({
                      ...newItineraryEntry,
                      activities: e.target.value,
                    })
                  }
                />
                <Upload
                  beforeUpload={(file) => {
                    setNewItineraryEntry((prev) => ({
                      ...prev,
                      image: file,
                    }));
                    return false; // prevent automatic upload
                  }}
                  showUploadList={{ showRemoveIcon: true }}
                  onRemove={() =>
                    setNewItineraryEntry((prev) => ({ ...prev, image: null }))
                  }
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>
                    Upload Itinerary Image
                  </Button>
                </Upload>

                <Button
                  type="primary"
                  onClick={handleAddItinerary}
                  icon={<PlusOutlined />}
                  disabled={
                    !newItineraryEntry.title || !newItineraryEntry.activities
                  }
                  block
                >
                  Add Day to Itinerary
                </Button>
              </Space>
            </Card>

            {itinerary.length > 0 && (
              <List
                bordered
                dataSource={itinerary}
                style={{ backgroundColor: "#f0f5ff" }}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <Tooltip title="Remove Day">
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() =>
                            setItinerary(
                              itinerary.filter((_, i) => i !== index)
                            )
                          }
                        />
                      </Tooltip>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Space>
                          <CalendarOutlined />
                          <span>
                            {item.day}: {item.title}
                          </span>
                        </Space>
                      }
                      description={
                        <>
                          <div>{item.activities}</div>
                          {item.image && (
                            <img
                              src={
                                typeof item.image === "string"
                                  ? `http://localhost:5001/uploads/itinerary/${item.image}`
                                  : URL.createObjectURL(item.image)
                              }
                              alt="Itinerary"
                              style={{ marginTop: "10px", width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "6px" }}
                            />
                          )}
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            )}
          </Form>
        </div>
        <div style={footerStyle}>
          <Space>
            <Button onClick={onClose} icon={<CloseOutlined />} size="large">
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={form.submit}
              icon={<SaveOutlined />}
              loading={submitting}
              size="large"
            >
              {submitting
                ? "Saving..."
                : selectedPackage
                ? "Update Package"
                : "Save Package"}
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default PackageForm;
