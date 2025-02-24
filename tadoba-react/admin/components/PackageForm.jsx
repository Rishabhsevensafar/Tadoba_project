import React, { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD

const PackageForm = ({ onClose, fetchPackages, selectedPackage }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    description: "",
    images: [],
    realPrice: "",
    discountedPrice: "",
    duration: "",
    startDate: "",
    endDate: "",
    totalSeats: "",
    inclusions: [],
    exclusions: [],
    tripHighlights: [],
    itinerary: [],
  });
  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");
  const [newTripHighlight, setNewTripHighlight] = useState("");
  const [newItineraryEntry, setNewItineraryEntry] = useState({ title: "", description: "" });
=======
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
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Title } = Typography;

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
  const [includes, setincludes] = useState([]);
  const [excludes, setexcludes] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [newincludes, setNewincludes] = useState("");
  const [newexcludes, setNewexcludes] = useState("");
  const [newItineraryEntry, setNewItineraryEntry] = useState({
    title: "",
    activities: "",
  });
  const [fileList, setFileList] = useState([]);
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45

  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
<<<<<<< HEAD
    // Fetch categories for dropdown
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/admin/categories/", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    if (selectedPackage) {
      setFormData({
        title: selectedPackage.title,
        categoryId: selectedPackage.categoryId,
        description: selectedPackage.description,
        images: selectedPackage.images || [],
        realPrice: selectedPackage.realPrice,
        discountedPrice: selectedPackage.discountedPrice,
        duration: selectedPackage.duration,
        startDate: selectedPackage.startDate,
        endDate: selectedPackage.endDate,
        totalSeats: selectedPackage.totalSeats,
        inclusions: selectedPackage.inclusions || [],
        exclusions: selectedPackage.exclusions || [],
        tripHighlights: selectedPackage.tripHighlights || [],
        itinerary: selectedPackage.itinerary || [],
      });
    }
  }, [selectedPackage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleAddToList = (field, value, clearFn) => {
    if (value) {
      setFormData({ ...formData, [field]: [...formData[field], value] });
      clearFn("");
    }
  };

  const handleRemoveFromList = (field, index) => {
    const updatedList = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedList });
=======
    if (selectedPackage) {
      form.setFieldsValue({
        title: selectedPackage.title,
        description: selectedPackage.description,
        price: selectedPackage.price,
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
      setincludes(selectedPackage.includes || []);
      setexcludes(selectedPackage.excludes || []);
      setItinerary(selectedPackage.itinerary || []);
    } else {
      form.resetFields();
      setFileList([]);
      setincludes([]);
      setexcludes([]);
      setItinerary([]);
    }
  }, [selectedPackage, form]);

  const handleAddincludes = () => {
    if (newincludes.trim()) {
      setincludes([...includes, newincludes]);
      setNewincludes("");
    }
  };

  const handleAddexcludes = () => {
    if (newexcludes.trim()) {
      setexcludes([...excludes, newexcludes]);
      setNewexcludes("");
    }
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
  };

  const handleAddItinerary = () => {
    if (newItineraryEntry.title && newItineraryEntry.description) {
<<<<<<< HEAD
      setFormData({
        ...formData,
        itinerary: [
          ...formData.itinerary,
          {
            day: `Day ${formData.itinerary.length + 1}`, // Auto-assign day number
            title: newItineraryEntry.title,
            description: newItineraryEntry.description,
          },
        ],
      });
=======
      setItinerary([
        ...itinerary,
        {
          day: `Day ${itinerary.length + 1}`,
          title: newItineraryEntry.title,
          activities: newItineraryEntry.activities,
        },
      ]);
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
      setNewItineraryEntry({ title: "", description: "" });
    }
  };

<<<<<<< HEAD

  const handleSubmit = async (e) => {
    e.preventDefault();
    const packageData = new FormData();
    for (let key in formData) {
      if (key === "images") {
        formData[key].forEach((file) => packageData.append("images", file));
      } else if (["inclusions", "exclusions", "tripHighlights", "itinerary"].includes(key)) {
        packageData.append(key, JSON.stringify(formData[key]));
      } else {
        packageData.append(key, formData[key]);
      }
    }

    try {
      if (selectedPackage) {
        await axios.put(`http://localhost:8000/api/admin/packages/${selectedPackage._id}`, packageData, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      } else {
        await axios.post("http://localhost:8000/api/admin/packages/create", packageData, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      }
=======
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const packageData = new FormData();

      packageData.append("title", values.title);
      packageData.append("description", values.description);
      packageData.append("price", values.price);
      packageData.append("location", values.location); // ✅ Ensure location is sent
      packageData.append("duration", values.duration);

      if (values.dateRange && values.dateRange.length === 2) {
        packageData.append(
          "startDate",
          values.dateRange[0].format("YYYY-MM-DD")
        );
        packageData.append("endDate", values.dateRange[1].format("YYYY-MM-DD"));
      }

      packageData.append("totalSeats", values.totalSeats);

      fileList.forEach((file) => {
        if (file.originFileObj) {
          packageData.append("images", file.originFileObj);
        }
      });

      packageData.append("includes", JSON.stringify(includes));
      packageData.append("excludes", JSON.stringify(excludes));
      packageData.append("itinerary", JSON.stringify(itinerary));

      if (selectedPackage) {
        await axios.put(
          `http://localhost:5000/api/tourpackage/${selectedPackage._id}`,
          packageData,
          {
            headers: { Authorization: `Bearer ${adminToken}` },
          }
        );
        console.log("Package updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/tourpackage/create",
          packageData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // ✅ Required for file uploads
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        console.log("Package created successfully!");
      }

>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
      fetchPackages();
      onClose();
    } catch (error) {
      console.error("Error saving package:", error);
<<<<<<< HEAD
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{selectedPackage ? "Edit Package" : "Add Package"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="border p-2 rounded"
              />
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border p-2 rounded"
              />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border p-2 rounded"
              />

              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="realPrice"
                  value={formData.realPrice}
                  onChange={handleInputChange}
                  placeholder="Real Price"
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                  placeholder="Discounted Price"
                  className="border p-2 rounded"
                />
              </div>

              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="E.g., 5 days & 4 nights"
                className="border p-2 rounded"
              />

              {/* Dates & Seats */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                />
              </div>
              <input
                type="number"
                name="totalSeats"
                value={formData.totalSeats}
                onChange={handleInputChange}
                placeholder="Total Seats"
                className="border p-2 rounded"
              />

              {/* Dynamic Fields */}
              {[
                { name: "inclusions", placeholder: "Add an inclusion", value: newInclusion, setValue: setNewInclusion },
                { name: "exclusions", placeholder: "Add an exclusion", value: newExclusion, setValue: setNewExclusion },
                {
                  name: "tripHighlights",
                  placeholder: "Add a trip highlight",
                  value: newTripHighlight,
                  setValue: setNewTripHighlight,
                },
              ].map((field) => (
                <div key={field.name}>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      placeholder={field.placeholder}
                      className="border p-2 rounded flex-grow"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddToList(field.name, field.value, field.setValue)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="list-disc pl-5">
                    {formData[field.name].map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        {item}
                        <button
                          type="button"
                          onClick={() => handleRemoveFromList(field.name, index)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Itinerary */}
              <div>
                <h3 className="text-lg font-bold">Itinerary</h3>
                <div className="flex space-x-2 mb-2">
                <input
                    type="text"
                    placeholder="Title (e.g., Visit Burj Khalifa)"
                    value={newItineraryEntry.title}
                    onChange={(e) =>
                      setNewItineraryEntry({ ...newItineraryEntry, title: e.target.value })
                    }
                    className="border p-2 rounded flex-grow"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newItineraryEntry.description}
                    onChange={(e) =>
                      setNewItineraryEntry({ ...newItineraryEntry, description: e.target.value })
                    }
                    className="border p-2 rounded flex-grow"
                  />
                  <button
                    type="button"
                    onClick={handleAddItinerary}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <ul className="list-disc pl-5">
                  {formData.itinerary.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>
                        <strong>{item.day}:</strong> {item.title} - {item.description}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromList("itinerary", index)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div> 
=======
      Modal.error({
        title: "Error",
        content: "Failed to save package. Please try again.",
      });
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
            {selectedPackage ? "Edit Package" : "Add Package"}
          </Title>
        </div>

        <div style={contentStyle}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="title"
              label="Package Title"
              rules={[
                { required: true, message: "Please enter package title" },
              ]}
            >
              <Input placeholder="Enter package title" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter package description" },
              ]}
            >
              <TextArea rows={4} placeholder="Enter package description" />
            </Form.Item>

            <Form.Item label="Package Images">
              <Upload {...uploadProps} listType="picture-card" multiple>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Price"
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
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="duration"
                  label="Duration"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input placeholder="E.g., 5 days & 4 nights" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="dateRange"
              label="Package Dates"
              rules={[
                { required: true, message: "Please select package dates" },
              ]}
            >
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="totalSeats"
              label="Total Seats"
              rules={[
                {
                  required: true,
                  message: "Please enter total available seats",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Divider orientation="left">includes</Divider>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={newincludes}
                onChange={(e) => setNewincludes(e.target.value)}
                placeholder="Add an includes"
                onPressEnter={handleAddincludes}
              />
              <Button
                type="primary"
                onClick={handleAddincludes}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </Space.Compact>

            <List
              size="small"
              bordered
              style={{ marginTop: 16, marginBottom: 24 }}
              dataSource={includes}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() =>
                        setincludes(includes.filter((_, i) => i !== index))
                      }
                    />,
                  ]}
                >
                  {item}
                </List.Item>
              )}
            />

            <Divider orientation="left">excludes</Divider>
            <Space.Compact style={{ width: "100%" }}>
              <Input
                value={newexcludes}
                onChange={(e) => setNewexcludes(e.target.value)}
                placeholder="Add an excludes"
                onPressEnter={handleAddexcludes}
              />
              <Button
                type="primary"
                onClick={handleAddexcludes}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
            </Space.Compact>

            <List
              size="small"
              bordered
              style={{ marginTop: 16, marginBottom: 24 }}
              dataSource={excludes}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() =>
                        setexcludes(excludes.filter((_, i) => i !== index))
                      }
                    />,
                  ]}
                >
                  {item}
                </List.Item>
              )}
            />

            <Divider orientation="left">Itinerary</Divider>
            <Card size="small" style={{ marginBottom: 16 }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input
                  placeholder="Day title"
                  value={newItineraryEntry.title}
                  onChange={(e) =>
                    setNewItineraryEntry({
                      ...newItineraryEntry,
                      title: e.target.value,
                    })
                  }
                />
                <TextArea
                  rows={2}
                  placeholder="Day description"
                  value={newItineraryEntry.description}
                  onChange={(e) =>
                    setNewItineraryEntry({
                      ...newItineraryEntry,
                      description: e.target.value,
                    })
                  }
                />
                <Button
                  type="primary"
                  onClick={handleAddItinerary}
                  icon={<PlusOutlined />}
                  disabled={
                    !newItineraryEntry.title || !newItineraryEntry.description
                  }
                >
                  Add Day
                </Button>
              </Space>
            </Card>

            {itinerary.length > 0 && (
              <List
                bordered
                dataSource={itinerary}
                renderItem={(item, index) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          setItinerary(itinerary.filter((_, i) => i !== index))
                        }
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${item.day}: ${item.title}`}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            )}
          </Form>
        </div>

        <div style={footerStyle}>
          <Space>
            <Button onClick={onClose} icon={<CloseOutlined />}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={form.submit}
              icon={<SaveOutlined />}
            >
              Save Package
            </Button>
          </Space>
        </div>
      </div>
>>>>>>> b829a27af4fb3e5f6705c3ff039c142fe99aab45
    </div>
  );
};

export default PackageForm;
