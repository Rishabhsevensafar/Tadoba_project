import React from "react";
import { useEffect } from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
function Header() {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  return (
    <>
      <div>
        <header className="sectionNavbar">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light">
              <img src={logo} alt="Logo" />
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse navBarContaioner"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    {/* <a className="nav-link" href="#">Home </a> */}
                    <Link className="nav-link" to="/">
                      Home{" "}
                    </Link>
                  </li>
                  <li className="nav-item">
                    {/* <a className="nav-link" href="#">About</a> */}
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/safaribooking">
                      Online Safari Booking
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/tourpackage">
                      Tour Package
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/hotelpage">
                      Hotel in Tadoba
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/paymentpage">
                      Payment
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/contactus">
                      Contact Us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      +91-7982653974 | +91-7982653974
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
