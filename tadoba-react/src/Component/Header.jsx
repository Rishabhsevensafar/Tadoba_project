import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import axios from "axios";
const BASE_URL = "http://localhost:5000";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/global-setting`).then((res) => {
      if (res.data.logoUrl) {
        setLogoUrl(`${BASE_URL}${res.data.logoUrl}`);
      }
    });
  }, []);
  return (
    <header className="navbar-container">
      <div className="navbar">
        {/* Logo */}
        <img src={logoUrl || logo} alt="Logo" className="logo" />

        {/* Desktop Navbar Links */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/tourpackage">Tour Package</Link>
          <Link to="/hotels">Hotel in Tadoba</Link>
          <Link
            to="/safari-booking"
            style={{
              backgroundColor: "#e68d1d",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            Online Safari Booking
          </Link>
          <Link to="/paymentpage">Payment</Link>
          <Link to="/contactus">Contact Us</Link>
          <Link to="#" className="contact-number">
            +91-7982653974
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button className="toggle-btn" onClick={toggleNavbar}>
          ☰
        </button>
      </div>

      {/* Overlay Background */}
      <div
        className={`overlay ${isOpen ? "overlay-show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Sidebar Navigation */}
      <nav className={`mobile-nav ${isOpen ? "slide-in" : "slide-out"}`}>
        {/* Header with Logo & Close Button */}
        <div className="mobile-header">
          <img
            src={logoUrl || "/default-logo.png"}
            alt="Logo"
            className="mobile-logo"
          />
          <button className="close-btn" onClick={toggleNavbar}>
            ✖
          </button>
        </div>

        <Link to="/" onClick={toggleNavbar}>
          Home
        </Link>
        <Link to="/about" onClick={toggleNavbar}>
          About
        </Link>
        <Link to="/tourpackage">Tour Package</Link>
          <Link to="/hotels">Hotel in Tadoba</Link>
          <Link
            to="/safari-booking"
            style={{
              backgroundColor: "#e68d1d",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            Online Safari Booking
          </Link>
          <Link to="/paymentpage">Payment</Link>
          <Link to="/contactus">Contact Us</Link>
        <Link href="#" className="contact-number" onClick={toggleNavbar}>
          +91-7982653974
        </Link>
      </nav>
    </header>
  );
}

export default Header;
