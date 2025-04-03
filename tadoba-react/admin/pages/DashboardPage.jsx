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
  ConfigProvider,
} from "antd";
import {
  Binoculars,
  Building,
  Building2,
  Compass,
  CreditCard,
  Gauge,
  Map,
  MapPin,
  MessageCircle,
  Newspaper,
  PhoneCall,
  ChevronDown,
  Package,
  HelpCircle,
  Hotel,
  DollarSign,
  Home,
  Settings,
  LogOut,
  User,
  IndianRupee
} from "lucide-react";
import { UserOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

// Corbett National Park inspired theme colors
const corbettTheme = {
  token: {
    colorPrimary: "#2C5F2D", // Forest green
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f5f7f2", // Light natural tone
    colorTextBase: "#333333",
    colorTextSecondary: "#666666",
    colorBgElevated: "#edf3e7", // Light green bg for dropdowns
    colorBorder: "#c9d8b6", // Light border color
    colorSuccess: "#5a8a5a", // Dark green for success states
    colorError: "#d25f5f", // Reddish for error/danger states
    colorWarning: "#e6a23c", // Amber for warning states
  },
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      icon: <LogOut size={20} style={{ color: token.colorError }} />,
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      },
    });
  };

  // Reorganized menu with dropdowns
  const menuItems = [
    {
      key: "dashboard",
      icon: <Gauge size={20} />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "enquiries",
      icon: <MessageCircle size={20} />,
      label: "Enquiries",
      children: [
        {
          key: "/admin/dashboard/tour-enquiry",
          icon: <HelpCircle size={18} />,
          label: "Tour Enquiry",
          onClick: () => navigate("/admin/dashboard/tour-enquiry"),
        },
        {
          key: "/admin/dashboard/hotel-enquiry",
          icon: <Building2 size={18} />,
          label: "Hotel Enquiry",
          onClick: () => navigate("/admin/dashboard/hotel-enquiry"),
        },
        {
          key: "/admin/dashboard/safari-enquiry",
          icon: <Compass size={18} />,
          label: "Safari Enquiry",
          onClick: () => navigate("/admin/dashboard/safari-enquiry"),
        }
      ],
    },
    {
      key: "bookings",
      icon: <Map size={20} />,
      label: "Bookings",
      children: [
        {
          key: "/admin/dashboard/safari-booking-report",
          icon: <Binoculars size={18} />,
          label: "Safari Bookings",
          onClick: () => navigate("/admin/dashboard/safari-booking-report"),
        },
        {
          key: "/admin/dashboard/tour-booking",
          icon: <MapPin size={18} />,
          label: "Tour Bookings",
          onClick: () => navigate("/admin/dashboard/tour-booking"),
        },
      ],
    },

    {
      key: "management",
      icon: <Package size={20} />,
      label: "Management",
      children: [
        {
          key: "/admin/dashboard/Packages",
          icon: <MapPin size={18} />,
          label: "Tour Packages",
          onClick: () => navigate("/admin/dashboard/Packages"),
        },
        {
          key: "/admin/dashboard/hotel-manager",
          icon: <Hotel size={18} />,
          label: "Hotel Manager",
          onClick: () => navigate("/admin/dashboard/hotel-manager"),
        }
      ],
    },
    {
      key: "/admin/dashboard/quick-payment",
      icon: <IndianRupee size={20} />,
      label: "Payments",
      onClick: () => navigate("/admin/dashboard/quick-payment"),
    },
    {
      key: "/admin/dashboard/contact-enquiry",
      icon: <PhoneCall size={18} />,
      label: "Contact Enquiry",
      onClick: () => navigate("/admin/dashboard/contact-enquiry"),
    },
    {
      key: "/admin/dashboard/blogs",
      icon: <Newspaper size={18} />,
      label: "Blogs",
      onClick: () => navigate("/admin/dashboard/blogs"),
    },
  ];

  const userMenu = [
    {
      key: "profile",
      icon: <User size={16} />,
      label: "Profile",
      onClick: () => navigate("/admin/dashboard/profile"),
    },
    {
      key: "settings",
      icon: <Settings size={16} />,
      label: "Settings",
      onClick: () => navigate("/admin/dashboard/settings"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogOut size={16} />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <ConfigProvider theme={corbettTheme}>
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
            backgroundColor: token.colorBgElevated,
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.08)",
          }}
          width={240}
          theme="light"
        >
          {/* Logo and Brand */}
          <div
            style={{
              padding: "20px 16px",
              textAlign: "center",
              borderBottom: `1px solid ${token.colorBorder}`,
              background: token.colorPrimary,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              paddingLeft: collapsed ? 0 : 24,
            }}
          >
            <Binoculars size={24} color="#ffffff" />
            {!collapsed && (
              <Title
                level={4}
                style={{
                  margin: 0,
                  marginLeft: 12,
                  color: "#ffffff",
                  transition: "all 0.3s",
                }}
              >
                Tadoba Admin
              </Title>
            )}
          </div>

          {/* Sidebar Menu */}
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={collapsed ? [] : ["bookings", "enquiries", "management"]}
            style={{
              borderRight: 0,
              backgroundColor: "transparent",
              padding: "12px 0",
            }}
          >
            {menuItems.map((item) => {
              if (item.children) {
                return (
                  <SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                    style={{
                      margin: "4px 8px",
                      borderRadius: "8px",
                    }}
                  >
                    {item.children.map((child) => (
                      <Menu.Item
                        key={child.key}
                        icon={child.icon}
                        onClick={child.onClick}
                        style={{
                          margin: "4px 0",
                          paddingLeft: 36,
                          borderRadius: "4px",
                        }}
                      >
                        {child.label}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                );
              }
              return (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={item.onClick}
                  style={{
                    margin: "4px 8px",
                    borderRadius: "8px",
                    transition: "all 0.3s",
                  }}
                >
                  {item.label}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 240,
            transition: "all 0.3s ease-in-out",
            background: token.colorBgLayout,
          }}
        >
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
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
              height: 64,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Title
                level={5}
                style={{
                  margin: 0,
                  marginLeft: 16,
                  color: token.colorTextBase,
                }}
              >
                {/* Dynamically show current section title based on path */}
                {location.pathname.includes("safari-booking") 
                  ? "Safari Bookings" 
                  : location.pathname.includes("/tour-booking") 
                  ? "Tour Bookings"
                  : location.pathname.includes("/Packages")
                  ? "Tour Packages"
                  : location.pathname.includes("/enquiry")
                  ? "Enquiries"
                  : location.pathname.includes("/hotel-manager")
                  ? "Hotel Manager"
                  : location.pathname.includes("/quick-payment")
                  ? "Quick Payments"
                  : location.pathname.includes("/blogs")
                  ? "Blog Management"
                  : "Dashboard"}
              </Title>
            </div>

            <Space>
              <Dropdown menu={{ items: userMenu }} placement="bottomRight">
                <Space
                  style={{
                    cursor: "pointer",
                    // padding: "8px 12px",
                    // borderRadius: "8px",
                    transition: "all 0.3s",
                    background: token.colorBgElevated,
                    // border: `1px solid ${token.colorBorder}`,
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: token.colorPrimary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    size={32}
                  >
                    <UserOutlined />
                  </Avatar>
                  <span style={{ color: token.colorTextSecondary, fontWeight: 500 }}>
                    Admin
                  </span>
                  <ChevronDown size={16} color={token.colorTextSecondary} />
                </Space>
              </Dropdown>
            </Space>
          </Header>

          {/* Page Content */}
          <Content
            style={{
              margin: "24px",
              borderRadius: "12px",
              backgroundColor: "transparent", 
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashboardPage;