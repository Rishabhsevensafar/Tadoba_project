import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import { useEffect } from "react";
import contactBanner from "../../assets/images/contact-banner.jpg";

function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div>
        <img src={contactBanner} alt="Conatct page banner image" />
      </div>
      <section className="leaf">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="addressBox">
                <h5>Branch Office</h5>
                <p>
                  15/8, Block -15, Near <br />
                  Exide Battery, Geeta Colony, <br />
                  East Delhi, New Delhi - 110031
                </p>
                <h6>Email</h6>
                <p>contact@tadobanationalparkonline.in </p>
                <h6>Registered Office-</h6>
                <p>
                  15/8, Block -15, Near Battery, Geeta Colony, East Delhi, New
                  Delhi - 110031
                </p>
                <h6>Phone-</h6>
                <p>+91-7982653974</p>
              </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 contactUs">
              <h4>Contact Us</h4>
              <input
                type="text"
                className="contactInput"
                placeholder="Enter Your Name"
              />
              <br />
              <input
                type="email"
                className="contactInput"
                placeholder="Enter Your Email"
              />
              <br />
              <input
                type="number"
                className="contactInput"
                placeholder="Enter Your Number"
              />
              <br />
              <input
                type="textarea"
                className="contactarea"
                placeholder="Enter Your Message"
              />
              <br />
              <button type="button" className="btn btn-primary contactInput">
                Send Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <ImportantLinks />
      <Footer />
    </>
  );
}

export default ContactUs;
