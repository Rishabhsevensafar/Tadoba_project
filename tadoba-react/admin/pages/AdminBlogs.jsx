import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Upload, Select, message, Typography, Space, Row, Col } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { getBlogsAdmin, createBlog, updateBlog, deleteBlog } from "../service/blogServices";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;
const { Text, Paragraph } = Typography;

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [form] = Form.useForm();
  const [editingBlog, setEditingBlog] = useState(null);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    console.log("Updated Blogs State:", blogs);
  }, [blogs]);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogsAdmin();
      console.log("Fetched Blogs:", data); // Debugging line
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  const openModal = (blog = null) => {
    setEditingBlog(blog);
    setModalVisible(true);
    setFile(null);
    if (blog) {
      form.setFieldsValue({
        title: blog.title,
        content: blog.content,
        tags: blog.tags.join(", "),
        status: blog.status,
      });
      setContent(blog.content);
    } else {
      form.resetFields();
      setContent('');
    }
  };

  const openViewModal = (blog) => {
    setCurrentBlog(blog);
    setViewModalVisible(true);
  };

  const handleFileChange = ({ file }) => {
    setFile(file);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", content); // Use the rich text content from ReactQuill
    formData.append("tags", values.tags);
    formData.append("status", values.status);
  
    if (file) {
      formData.append("image", file);
    } else if (editingBlog?.image) {
      // If no new file is uploaded, retain the existing image
      formData.append("image", editingBlog.image);
    }
  
    try {
      if (editingBlog) {
        // Update the blog
        await updateBlog(editingBlog._id, formData, token);
        message.success("Blog updated successfully!");
      } else {
        // Create a new blog
        await createBlog(formData, token);
        message.success("Blog created successfully!");
      }
  
      // Close the modal and refresh the blog list
      setModalVisible(false);
      fetchBlogs(); // Fetch the latest blogs from the server
    } catch (error) {
      console.error("Error saving blog:", error);
      message.error("Failed to save blog.");
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id, token);
      message.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Failed to delete blog.");
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image) => (
        <img 
          src={`http://localhost:5000${image}`} 
          alt="Blog" 
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
        />
      ),
    },
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title",
      // render: (title) => truncateText(title, 30)
    },
    // { 
    //   title: "Content", 
    //   dataIndex: "content", 
    //   key: "content",
    //   render: (content) => truncateText(content, 50)
    // },
    { 
      title: "Tags", 
      dataIndex: "tags", 
      key: "tags", 
      render: (tags) => truncateText(tags.join(", "), 30) 
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => (
        <Text 
          style={{ 
            padding: '2px 8px', 
            borderRadius: '4px',
            backgroundColor: status === 'Published' ? '#e6f7ff' : '#fff7e6',
            color: status === 'Published' ? '#1890ff' : '#fa8c16'
          }}
        >
          {status}
        </Text>
      )
    },
    {
      title: "Actions",
      key: "actions",
      width: 220,
      render: (_, blog) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => openViewModal(blog)}
            size="small"
          >
          </Button>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => openModal(blog)}
            size="small"
          >
          </Button>
          <Button 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => handleDelete(blog._id)}
            size="small"
          >
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Blogs</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => openModal()}>New Blog</Button>
      </div>

      <Table 
        dataSource={blogs} 
        columns={columns} 
        rowKey="_id" 
        pagination={{ pageSize: 5 }}
        bordered
        size="middle"
        scroll={{ x: 'max-content' }}
      />

      {/* Create/Edit Modal */}
      <Modal 
        title={editingBlog ? "Edit Blog" : "Create Blog"} 
        open={modalVisible} 
        onCancel={() => setModalVisible(false)} 
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
            <Input placeholder="Enter blog title" />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true, message: "Content is required" }]}>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Input placeholder="Enter tags (comma separated)" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="Draft">Draft</Option>
              <Option value="Published">Published</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload 
              beforeUpload={() => false} 
              onChange={handleFileChange} 
              maxCount={1}
              accept="image/*"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{editingBlog ? "Update" : "Create"}</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Blog Modal */}
      <Modal
        title="View Blog"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
          <Button key="edit" type="primary" onClick={() => {
            setViewModalVisible(false);
            openModal(currentBlog);
          }}>
            Edit
          </Button>
        ]}
        width={800}
      >
        {currentBlog && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <img 
                    src={`http://localhost:5000${currentBlog.image}`} 
                    alt={currentBlog.title} 
                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} 
                  />
                </div>
              </Col>
              <Col span={24}>
                <Typography.Title level={3}>{currentBlog.title}</Typography.Title>
                <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                  <Text type="secondary">
                    Tags: {currentBlog.tags.join(", ")}
                  </Text>
                  <Text 
                    style={{ 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      backgroundColor: currentBlog.status === 'Published' ? '#e6f7ff' : '#fff7e6',
                      color: currentBlog.status === 'Published' ? '#1890ff' : '#fa8c16'
                    }}
                  >
                    {currentBlog.status}
                  </Text>
                </div>
                <Paragraph style={{ marginTop: '20px' }}>
                  <div dangerouslySetInnerHTML={{ __html: currentBlog.content }} />
                </Paragraph>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminBlogs;