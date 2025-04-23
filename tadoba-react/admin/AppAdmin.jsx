import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardStats from "../admin/components/DashboardStats";
import CategoryManager from "./pages/CategoryManager";
import PackageManager from "./pages/PackageManager";
import AdminBookings from "./pages/AdminBookings";
import HotelManager from "./pages/HotelManager";
import SafariBookingReport from "./pages/safariBookingReport";
import AdminTourEnquiries from "./pages/AdminTourEnquiry";
import AdminEnquiries from "./pages/AdminEnquires";
import AdminTourBookings from "./pages/AdminTourBooking";
import AdminSafariEnquiries from "./pages/AdminSafariEnquiry";
import AdminContactEnquiries from "./pages/AdminContactEnquiry";
import AdminBlogs from "./pages/AdminBlogs";
import AdminQuickPaymentReports from "./pages/AdminQuickPayment";
import AdminBookingConfig from "./pages/AdminSafariConfig";
import GlobalSettings from "./pages/AdminGlobalSetting";
import AdminProfile from "./pages/AdminProfile";
import AdminUserManager from "./pages/AdminUserManager";
import ProtectedRoute from "../admin/pages/PrivateRoutes"; // ✅ Updated import
import AdminRoleManager from "./pages/AdminRoleManage";
import AdminPermissionManager from "./pages/AdminPermissionManager";
import AdminPageSEO from "./pages/AdminSeoPage";
import HeroSettings from "./pages/AdminHero";

const AppAdmin = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardStats />} />

          <Route
            path="safari-enquiry"
            element={
              <ProtectedRoute allowedPermissions={["enquiries"]}>
                <AdminSafariEnquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="tour-enquiry"
            element={
              <ProtectedRoute allowedPermissions={["enquiries"]}>
                <AdminTourEnquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="hotel-enquiry"
            element={
              <ProtectedRoute allowedPermissions={["enquiries"]}>
                <AdminEnquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="tour-booking"
            element={
              <ProtectedRoute allowedPermissions={["bookings"]}>
                <AdminTourBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="safari-booking-report"
            element={
              <ProtectedRoute allowedPermissions={["bookings"]}>
                <SafariBookingReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="contact-enquiry"
            element={
              <ProtectedRoute allowedPermissions={["contact-enquiry"]}>
                <AdminContactEnquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="blogs"
            element={
              <ProtectedRoute allowedPermissions={["blogs"]}>
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="quick-payment"
            element={
              <ProtectedRoute allowedPermissions={["quick-payment"]}>
                <AdminQuickPaymentReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="date-config"
            element={
              <ProtectedRoute allowedPermissions={["manager"]}>
                <AdminBookingConfig />
              </ProtectedRoute>
            }
          />
          <Route
            path="setting"
            element={
              <ProtectedRoute allowedPermissions={["global-setting"]}>
                <GlobalSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="user-manager"
            element={
              <ProtectedRoute allowedPermissions={["user-manager"]}>
                <AdminUserManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="Role-manager"
            element={
              <ProtectedRoute allowedPermissions={["user-manager"]}>
                <AdminRoleManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="Permission-manager"
            element={
              <ProtectedRoute allowedPermissions={["user-manager"]}>
                <AdminPermissionManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="hotel-manager"
            element={
              <ProtectedRoute allowedPermissions={["manager"]}>
                <HotelManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="Packages"
            element={
              <ProtectedRoute allowedPermissions={["manager"]}>
                <PackageManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="Categories"
            element={
              <ProtectedRoute allowedPermissions={["manager"]}>
                <CategoryManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="Categories"
            element={
              <ProtectedRoute allowedPermissions={["manager"]}>
                <CategoryManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="booking-report"
            element={
              <ProtectedRoute allowedPermissions={["manager"]}>
                <AdminBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="on-page-seo"
            element={
              <ProtectedRoute allowedPermissions={["global-setting"]}>
                <AdminPageSEO />
              </ProtectedRoute>
            }
          />
          <Route
            path="hero-setting"
            element={
              <ProtectedRoute allowedPermissions={["global-setting"]}>
                <HeroSettings />
              </ProtectedRoute>
            }
          />
          <Route path="Admin-profile" element={<AdminProfile />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppAdmin;
