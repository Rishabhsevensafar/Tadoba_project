import React, { useEffect, useState } from "react";
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
  Building2,
  Compass,
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
  Settings,
  LogOut,
  User,
  IndianRupee,
  Calendar1Icon,
} from "lucide-react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import axios from "axios";
const BASE_URL = "http://localhost:5000";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

const corbettTheme = {
  token: {
    colorPrimary: "#2C5F2D",
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f5f7f2",
    colorTextBase: "#333333",
    colorTextSecondary: "#666666",
    colorBgElevated: "#edf3e7",
    colorBorder: "#c9d8b6",
    colorSuccess: "#5a8a5a",
    colorError: "#d25f5f",
    colorWarning: "#e6a23c",
  },
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();
  const role = localStorage.getItem("admin-role");
  const [logoUrl, setLogoUrl] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin",
    avatar: null,
  });

  const handleLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      icon: <LogOut size={20} style={{ color: token.colorError }} />,
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      onOk: () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin-role");
        navigate("/admin/login");
      },
    });
  };
  useEffect(() => {
    axios.get(`${BASE_URL}/api/global-setting`).then((res) => {
      if (res.data.logoUrl) {
        setLogoUrl(`${BASE_URL}${res.data.logoUrl}`);
      }
    });
  }, []);
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:5000/api/profile/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        setAdminProfile(res.data);
        setPermissions(res.data.permissions || []);
  
        // ✅ Store permissions in localStorage for ProtectedRoute
        localStorage.setItem("admin-permissions", JSON.stringify(res.data.permissions || []));
      } catch (err) {
        console.error("Failed to load admin profile", err);
      }
    };
  
    fetchAdminProfile();
  }, []);
  

  const menuItems = [
    {
      key: "dashboard",
      icon: <Gauge size={20} />,
      label: "Dashboard",
      // permission: "dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "enquiries",
      icon: <MessageCircle size={20} />,
      label: "Enquiries",
      permission: "enquiries",
      children: [
        {
          key: "/admin/dashboard/safari-enquiry",
          icon: <Compass size={18} />,
          label: "Safari Enquiry",
          permission: "enquiries",
          onClick: () => navigate("/admin/dashboard/safari-enquiry"),
        },
        {
          key: "/admin/dashboard/tour-enquiry",
          icon: <HelpCircle size={18} />,
          label: "Tour Enquiry",
          permission: "enquiries",
          onClick: () => navigate("/admin/dashboard/tour-enquiry"),
        },
        {
          key: "/admin/dashboard/hotel-enquiry",
          icon: <Building2 size={18} />,
          label: "Hotel Enquiry",
          // permission: "hotel-enquiry",
          onClick: () => navigate("/admin/dashboard/hotel-enquiry"),
        },
      ],
    },
    {
      key: "bookings",
      icon: <Map size={20} />,
      label: "Bookings",
      permission: "bookings",
      children: [
        {
          key: "/admin/dashboard/safari-booking-report",
          icon: <Binoculars size={18} />,
          label: "Safari Bookings",
          permission: "bookings",
          onClick: () => navigate("/admin/dashboard/safari-booking-report"),
        },
        {
          key: "/admin/dashboard/tour-booking",
          icon: <MapPin size={18} />,
          label: "Tour Bookings",
          permission: "bookings",
          onClick: () => navigate("/admin/dashboard/tour-booking"),
        },
      ],
    },
    {
      key: "management",
      icon: <Package size={20} />,
      label: "Management",
      permission: "manager",
      children: [
        {
          key: "/admin/dashboard/Packages",
          icon: <MapPin size={18} />,
          label: "Tour Packages",
          permission: "manager",
          onClick: () => navigate("/admin/dashboard/Packages"),
        },
        {
          key: "/admin/dashboard/hotel-manager",
          icon: <Hotel size={18} />,
          label: "Hotel Manager",
          permission: "manager",
          onClick: () => navigate("/admin/dashboard/hotel-manager"),
        },
        {
          key: "/admin/dashboard/date-config",
          icon: <Calendar1Icon size={18} />,
          label: "Date Config",
          permission: "manager",
          onClick: () => navigate("/admin/dashboard/date-config"),
        },
      ],
    },
    {
      key: "/admin/dashboard/quick-payment",
      icon: <IndianRupee size={20} />,
      label: "Payments",
      permission: "quick-payment",
      onClick: () => navigate("/admin/dashboard/quick-payment"),
    },
    {
      key: "/admin/dashboard/contact-enquiry",
      icon: <PhoneCall size={18} />,
      label: "Contact Enquiry",
      permission: "contact-enquiry",
      onClick: () => navigate("/admin/dashboard/contact-enquiry"),
    },
    {
      key: "/admin/dashboard/blogs",
      icon: <Newspaper size={18} />,
      label: "Blogs",
      permission: "blogs",
      onClick: () => navigate("/admin/dashboard/blogs"),
    },
    {
      key: "/admin/dashboard/setting",
      icon: <Settings size={18} />,
      label: "Global Settings",
      permission: "global-setting",
      onClick: () => navigate("/admin/dashboard/setting"),
    },
    {
      key: "/admin/dashboard/user-manager",
      icon: <User size={18} />,
      label: "User Manager",
      permission: "user-manager",
      onClick: () => navigate("/admin/dashboard/user-manager"),
    },
    {
      key: "/admin/dashboard/Role-manager",
      icon: <User size={18} />,
      label: "Role Manager",
      permission: "user-manager",
      onClick: () => navigate("/admin/dashboard/Role-manager"),
    },
    {
      key: "/admin/dashboard/Permission-manager",
      icon: <User size={18} />,
      label: "Permission Manager",
      permission: "user-manager",
      onClick: () => navigate("/admin/dashboard/Permission-manager"),
    },
  ];
  

  const visibleMenuItems = menuItems
  .filter((item) => {
    if (role === "admin") return true;
    return !item.permission || permissions.includes(item.permission);
  })
  .map((item) => {
    if (item.children) {
      const visibleChildren = item.children.filter(
        (child) =>
          role === "admin" || !child.permission || permissions.includes(child.permission)
      );
      if (visibleChildren.length > 0) {
        return { ...item, children: visibleChildren };
      }
      return null;
    }
    return item;
  })
  .filter(Boolean);

  const userMenu = [
    {
      key: "profile",
      icon: <User size={16} />,
      label: "Profile",
      onClick: () => navigate("/admin/dashboard/Admin-profile"),
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
          <div
            style={{
              padding: "20px 16px",
              textAlign: "center",
              borderBottom: `1px solid ${token.colorBorder}`,
              // background: token.colorPrimary,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              paddingLeft: collapsed ? 0 : 24,
              height: 64,
            }}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Admin Logo"
                style={{
                  maxHeight: 40,
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
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

          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={
              collapsed ? [] : ["bookings", "enquiries", "management"]
            }
            style={{
              borderRight: 0,
              backgroundColor: "transparent",
              padding: "12px 0",
            }}
          >
            {visibleMenuItems.map((item) => {
              if (item.children) {
                return (
                  <SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                    style={{ margin: "4px 8px", borderRadius: "8px" }}
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

        <Layout
          style={{
            marginLeft: collapsed ? 80 : 240,
            transition: "all 0.3s ease-in-out",
            background: token.colorBgLayout,
          }}
        >
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
            </div>

            <Space>
              <Dropdown menu={{ items: userMenu }} placement="bottomRight">
                <Space
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s",
                    background: token.colorBgElevated,
                  }}
                >
                  <Avatar
                    src={
                      adminProfile.avatar
                        ? `http://localhost:5000${adminProfile.avatar}`
                        : null
                    }
                    style={{
                      backgroundColor: token.colorPrimary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    size={32}
                    icon={!adminProfile.avatar && <UserOutlined />}
                  />
                  <span
                    style={{ color: token.colorTextSecondary, fontWeight: 500 }}
                  >
                    {adminProfile.name ||
                      (role === "seo"
                        ? "SEO"
                        : role === "sales"
                        ? "Sales"
                        : "Admin")}
                  </span>

                  <ChevronDown size={16} color={token.colorTextSecondary} />
                </Space>
              </Dropdown>
            </Space>
          </Header>

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
