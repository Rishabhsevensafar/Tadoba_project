import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
// import TopSaleBarAdmin from "./pages/TopSaleBarAdmin";
import DashboardStats from "../admin/components/DashboardStats";
// import AdminUserList from "./pages/AdminUserList";
import CategoryManager from "./pages/CategoryManager";
import PackageManager from "./pages/PackageManager";
// import BookingReport from "./pages/BookingReport";
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

const AppAdmin = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardStats />} />
          {/* <Route path="top-sale-bar" element={<TopSaleBarAdmin />} /> */}
          {/* <Route path="Users" element={<AdminUserList/>} /> */}
          <Route path="Categories" element= {<CategoryManager/>}/>
          <Route path="Packages" element={<PackageManager/>} />
          <Route path="booking-report" element= {<AdminBookings/>}/>
          <Route path="hotel-manager" element={<HotelManager/>}/>
          <Route path="safari-booking-report" element={<SafariBookingReport/>}/>
          <Route path="tour-enquiry" element={<AdminTourEnquiries/>}/>
          <Route path="hotel-enquiry" element={<AdminEnquiries/>}/>
          <Route path="tour-booking" element={<AdminTourBookings/>}/>
          <Route path="safari-enquiry" element={<AdminSafariEnquiries/>}/>
          <Route path="contact-enquiry" element={<AdminContactEnquiries/>}/>
          <Route path="blogs" element={<AdminBlogs/>}/>
          <Route path="quick-payment" element={<AdminQuickPaymentReports/>}/>
          <Route path="date-config" element={<AdminBookingConfig/>}/>
          <Route path="setting" element={<GlobalSettings/>}/>
          <Route path="Admin-profile" element={<AdminProfile/>}/>
          <Route path="user-manager" element={<AdminUserManager />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default AppAdmin;
