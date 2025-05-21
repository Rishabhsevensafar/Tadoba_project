import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  message,
  Select,
  Switch,
  Space,
} from "antd";
import axios from "axios";

const { Option } = Select;

const AdminPageSEO = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [pageOptions, setPageOptions] = useState([
    "/about",
    "/contactus",
    "/tourpackage",
    "/hotels",
    "/safari-booking",
    "/paymentpage",
    // Add your static paths here (excluding homepage)
  ]);

  const handlePathChange = async (path) => {
    form.resetFields();
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5001/api/pageseo/get-page-seo", {
        params: { path },
      });
      if (data?.seo) {
        form.setFieldsValue(data.seo);
      } else {
        form.setFieldsValue({ path });
      }
    } catch (err) {
      message.error("Failed to fetch SEO data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5001/api/pageseo/set-page-seo", values);
      message.success("SEO updated successfully");
    } catch (err) {
      message.error("Failed to save SEO");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Manage Page SEO (excluding Home)">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ noIndex: false }}
      >
        <Form.Item
          label="Page Path"
          name="path"
          rules={[{ required: true, message: "Please select a path" }]}
        >
          <Select
            placeholder="Select a page (excluding home)"
            onChange={handlePathChange}
          >
            {pageOptions.map((path) => (
              <Option key={path} value={path}>
                {path}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Meta Title" name="metaTitle">
          <Input placeholder="Enter meta title" />
        </Form.Item>

        <Form.Item label="Meta Description" name="metaDescription">
          <Input.TextArea rows={3} placeholder="Enter meta description" />
        </Form.Item>

        <Form.Item label="Meta Keywords" name="metaKeywords">
          <Input placeholder="Enter meta keywords (comma separated)" />
        </Form.Item>

        <Form.Item label="Canonical URL" name="canonicalUrl">
          <Input placeholder="https://yourdomain.com/about" />
        </Form.Item>

        <Form.Item label="No Index?" name="noIndex" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save SEO
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
              }}
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminPageSEO;
