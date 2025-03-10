import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Space,
  Avatar,
  Dropdown,
  theme,
  Modal,
} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  AppstoreOutlined,
  GiftOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FaEnvelopeSquare, FaSafari } from "react-icons/fa";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      icon: <LogoutOutlined style={{ color: token.colorError }} />,
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      },
    });
  };

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined style={{ fontSize: '20px' }}/>,
      label: "Dashboard",
    },
    {
      key: "/admin/dashboard/Packages",
      icon: <GiftOutlined style={{ fontSize: '20px' }}/>,
      label: "Tour Manager",
    },
    {
      key: "/admin/dashboard/hotel-manager",
      icon: <HomeOutlined style={{ fontSize: '20px' }}/>,
      label: "Hotel Manager",
    },
    {
      key: "/admin/dashboard/safari-booking-report",
      icon: <FaSafari size={'20'}/>,
      label: "Safari Booking",
    },
    {
      key: "/admin/dashboard/settings",
      icon: <SettingOutlined style={{ fontSize: '20px' }}/>,
      label: "Settings",
    },
    {
      key: "/admin/dashboard/tour-enquiry",
      icon: <FaEnvelopeSquare style={{ fontSize: '20px' }}/>,
      label: "Tour Enquiry",
    },
    {
      key: "/admin/dashboard/hotel-enquiry",
      icon: <FaEnvelopeSquare style={{ fontSize: '20px' }}/>,
      label: "Hotel Enquiry",
    },
    // {
    //   key: "/admin/dashboard/tour-booking",
    //   icon: <FaEnvelopeSquare style={{ fontSize: '20px' }}/>,
    //   label: "Tour Booking Report",
    // },
    {
      key: "/admin/dashboard/safari-enquiry",
      icon: <FaEnvelopeSquare style={{ fontSize: '20px' }}/>,
      label: "Safari Booking Report",
    },
    {
      key: "/admin/dashboard/contact-enquiry",
      icon: <FaEnvelopeSquare style={{ fontSize: '20px' }}/>,
      label: "Contact Enquiry Form",
    },
    {
      key: "/admin/dashboard/blogs",
      icon: <FaEnvelopeSquare style={{ fontSize: '20px' }}/>,
      label: "Blogs",
    },
  ];

  const userMenu = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          // backgroundColor: token.colorBgLayout,
          boxShadow: "2px 0 6px rgba(0, 0, 0, 0.1)",
        }}
        theme="light"
      >
        <div style={{ padding: 16, textAlign: "center" }}>
          <Title
            level={collapsed ? 4 : 3}
            style={{
              margin: 0,
              whiteSpace: "nowrap",
              color: token.colorPrimary,
              transition: "all 0.3s",
            }}
          >
            {collapsed ? "TA" : "Tadoba Admin"}
          </Title>
        </div>

        {/* Sidebar Menu */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{
                margin: "8px 12px",
                borderRadius: "8px",
                transition: "all 0.3s",
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: "all 0.3s ease-in-out" }}>
        {/* Header */}
        <Header
          style={{
            padding: "0 24px",
            background: token.colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <Space>
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space style={{ cursor: "pointer", padding: "4px 12px", borderRadius: "8px", transition: "all 0.3s" }}>
                <Avatar style={{ backgroundColor: token.colorPrimary }}>
                  <UserOutlined />
                </Avatar>
                <span style={{ color: token.colorTextSecondary, fontWeight: 500 }}>Admin</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* Page Content */}
        <Content
          style={{
            margin: "24px 16px",
            minHeight: 280,
            // background: token.colorBgContainer,
            borderRadius: "12px",
            // boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",  
            // padding: "24px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
