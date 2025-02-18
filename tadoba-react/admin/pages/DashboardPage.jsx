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
  ShoppingOutlined,
  UserOutlined,
  AppstoreOutlined,
  GiftOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

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
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    // {
    //   key: "/admin/dashboard/top-sale-bar",
    //   icon: <ShoppingOutlined />,
    //   label: "Top Sale Bar",
    // },
    // {
    //   key: "/admin/dashboard/Users",
    //   icon: <UserOutlined />,
    //   label: "Users",
    // },
    {
      key: "/admin/dashboard/Categories",
      icon: <AppstoreOutlined />,
      label: "Categories",
    },
    {
      key: "/admin/dashboard/Packages",
      icon: <GiftOutlined />,
      label: "Packages",
    },
    {
      key: "/admin/dashboard/booking-report",
      icon: <FileTextOutlined />,
      label: "Booking Report",
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
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        theme="light"
      >
        <div style={{ padding: 16, textAlign: "center" }}>
          <Space direction="vertical" size={collapsed ? 4 : 8}>
            <Title level={collapsed ? 4 : 3} style={{ margin: 0, whiteSpace: 'nowrap' }}>
              {collapsed ? "TS" : "Tadoba Admin"}
            </Title>
          </Space>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header style={{ 
          padding: '0 24px',
          background: token.colorBgContainer,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: token.boxShadowTertiary,
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          
          <Space>
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: token.colorPrimary }}>
                  <UserOutlined />
                </Avatar>
                <span style={{ color: token.colorTextSecondary }}>Admin</span>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          minHeight: 280,
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;