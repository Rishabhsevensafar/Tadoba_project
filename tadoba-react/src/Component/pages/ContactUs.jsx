import React, { useState, useEffect } from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import contactBanner from "../../assets/images/contact-banner.jpg";
import "../../styles/ContactUS.css"; 
import axios from "axios";
import { Helmet } from "react-helmet";
function ContactUs() {
    const [seo, setSeo] = useState({
      metaTitle: "About Us | Your Site",
      metaDescription: "",
      metaKeywords: "",
      canonicalUrl: "",
      noIndex: false,
    });
  
    useEffect(() => {
      const fetchSEO = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5001/api/pageseo/get-page-seo",
            {
              params: { path: "/contactus" },
            }
          );
  
          if (res.data?.seo) setSeo(res.data.seo);
        } catch (error) {
          console.error("Failed to fetch SEO data", error);
        }
      };
  
      fetchSEO();
    }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/contactenquiry/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Server error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{seo.metaTitle}</title>
        {seo.metaDescription && (
          <meta name="description" content={seo.metaDescription} />
        )}
        {seo.metaKeywords && (
          <meta name="keywords" content={seo.metaKeywords} />
        )}
        {seo.canonicalUrl && (
          <link rel="canonical" href={seo.canonicalUrl} />
        )}
        {seo.noIndex && <meta name="robots" content="noindex" />}
      </Helmet>
      <Header />
      <div className="contact-banner">
        <img src={contactBanner} alt="Contact page banner" className="banner-image" />
      </div>
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-row">
            <div className="contact-info">
              <h5 className="info-title">Branch Office</h5>
              <p className="info-text">
                15/8, Block -15, Near <br />
                Exide Battery, Geeta Colony, <br />
                East Delhi, New Delhi - 110031
              </p>
              <h6 className="info-subtitle">Email</h6>
              <p className="info-text">contact@tadobanationalparkonline.in</p>
              <h6 className="info-subtitle">Registered Office</h6>
              <p className="info-text">
                15/8, Block -15, Near Battery, Geeta Colony, East Delhi, New
                Delhi - 110031
              </p>
              <h6 className="info-subtitle">Phone</h6>
              <p className="info-text">+91-7982653974</p>
            </div>
            <div className="contact-form">
              <h4 className="form-title">Contact Us</h4>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="form-input"
                placeholder="Enter Your Name"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                className="form-input"
                placeholder="Enter Your Email"
                onChange={handleChange}
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                className="form-input"
                placeholder="Enter Your Number"
                onChange={handleChange}
              />
              <textarea
                name="message"
                value={formData.message}
                className="form-textarea"
                placeholder="Enter Your Message"
                onChange={handleChange}
              />
              <button
                type="button"
                className="form-button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Now"}
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