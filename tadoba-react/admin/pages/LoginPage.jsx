import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message, 
  Space, 
  Layout, 
  theme 
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/auth/login", 
        values
      );
      localStorage.setItem("adminToken", response.data.token);
      message.success({
        content: "Login successful!",
        duration: 2,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      message.error({
        content: error.response?.data?.message || "Invalid email or password",
        duration: 3,
      });
      form.setFields([
        {
          name: "password",
          errors: [""],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const contentStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    background: token.colorBgLayout,
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "420px",
    boxShadow: token.boxShadowCard,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <Layout>
      <Content style={contentStyle}>
        <Card style={cardStyle} bordered={false}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ margin: 0, color: token.colorPrimary }}>
                Admin Portal
              </Title>
              <Typography.Text type="secondary">
                Please login to continue
              </Typography.Text>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleLogin}
              requiredMark={false}
              size="large"
            >
              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input 
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="admin@example.com"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password 
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  size="large"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;