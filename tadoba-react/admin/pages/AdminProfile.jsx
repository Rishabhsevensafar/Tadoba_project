import React, { useEffect, useState } from "react";
import { Form, Input, Button, Avatar, Upload, message, Divider } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const BASE_URL = "http://localhost:5000"; // use env in production

const AdminProfile = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/profile/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      form.setFieldsValue(res.data);
      setAdminData(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load profile");
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const formData = new FormData();

      Object.entries(values).forEach(([key, val]) => {
        formData.append(key, val);
      });

      if (avatar) formData.append("avatar", avatar);

      await axios.put(`${BASE_URL}/api/profile/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      message.success("Profile updated!");
      fetchProfile();
    } catch (err) {
      message.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const oldPassword = form.getFieldValue("oldPassword");
      const newPassword = form.getFieldValue("newPassword");

      await axios.put(
        `${BASE_URL}/api/profile/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      message.success("Password updated!");
      form.resetFields(["oldPassword", "newPassword"]);
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2>Admin Profile</h2>
      <Divider />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Avatar
          size={100}
          src={adminData.avatar ? `${BASE_URL}${adminData.avatar}` : null}
          icon={!adminData.avatar && <UserOutlined />}
        />
        <div style={{ marginTop: 10 }}>
          <Upload
            beforeUpload={(file) => {
              setAvatar(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Change Avatar</Button>
          </Upload>
        </div>
      </div>

      <Form layout="vertical" form={form}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Admin name" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Contact Number" name="contactNumber">
          <Input placeholder="Contact Number" />
        </Form.Item>

        <Button type="primary" onClick={handleProfileUpdate} loading={loading}>
          Save Profile
        </Button>

        <Divider />

        <h3>Change Password</h3>
        <Form.Item label="Old Password" name="oldPassword" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>

        <Button type="dashed" onClick={handlePasswordChange}>
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default AdminProfile;
