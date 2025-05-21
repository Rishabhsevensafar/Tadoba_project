import React, { useState, useEffect } from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import { message } from "antd";
import { createOrder, verifyPayment } from "../../service/quickPaymentSerice";
import { useNavigate } from "react-router-dom";
import "../../styles/Payment.css";
import { Helmet } from "react-helmet";
import axios from "axios";
function PaymentPage() {
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
            params: { path: "/paymentpage" },
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

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    zip: "",
    amount: "",
    remark: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePayment = async () => {
    try {
      if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
        message.error("Please enter a valid amount.");
        return;
      }

      const orderData = await createOrder(formData);
      const { order, key_id, bookingId } = orderData;

      const options = {
        key: key_id,
        amount: order.amount,
        currency: "INR",
        name: "Tadoba Quick Payment",
        description: "Payment for services",
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await verifyPayment({
              order_id: response.razorpay_order_id,
              booking_id: bookingId,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              message.success("Payment successful!");
              navigate(
                `/payment-success?booking_id=${bookingId}&payment_id=${response.razorpay_payment_id}`
              );
            } else {
              message.error("Payment verification failed.");
            }
          } catch {
            message.error("Payment verification error.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#1e88e5",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      message.error("Payment failed.");
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
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        {seo.noIndex && <meta name="robots" content="noindex, nofollow" />}
      </Helmet>
      <Header />
      <section className="payment-hero-section text-center py-4">
        <div className="payment-hero-overlay">
          <h1 className="payment-page-title z-30">Quick Payment</h1>
          <p className="text-muted">Complete your booking securely</p>
        </div>
      </section>

      <section className="payment-form-section py-0">
        <div className="container">
          <div className="payment-form-wrapper">
            <h4 className="mb-0.5 py-0">Enter Payment Details</h4>
            <div className="row g-4">
              <div className="col-md-6">
                <label>Amount (INR)</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  placeholder="Enter amount"
                  onChange={handleChange}
                />
                <label className="mt-3">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Your name"
                  onChange={handleChange}
                />
                <label className="mt-3">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                />
                <label className="mt-3">Mobile</label>
                <input
                  type="tel"
                  className="form-control"
                  name="mobile"
                  placeholder="Mobile number"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Zip Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  placeholder="ZIP Code"
                  onChange={handleChange}
                />
                <label className="mt-3">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  placeholder="Your city"
                  onChange={handleChange}
                />
                <label className="mt-3">Currency</label>
                <input
                  type="text"
                  className="form-control"
                  value="INR (Indian Rupee)"
                  disabled
                />
                <label className="mt-3">Remark</label>
                <input
                  type="text"
                  className="form-control"
                  name="remark"
                  placeholder="Any remarks"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-end mt-4">
              <button className="hf-btn-enquiry px-4" onClick={handlePayment}>
                Confirm & Pay
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

export default PaymentPage;
