import React, { useState, useEffect } from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import { message } from "antd";
import { createOrder, verifyPayment } from "../../service/quickPaymentSerice"; // ✅ Fixed typo
import { useNavigate } from "react-router-dom";

function PaymentPage() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
        message.error("Please enter a valid amount.");
        return;
      }

      const orderData = await createOrder(formData);
      const { order, key_id, bookingId } = orderData; // ✅ bookingId is now included

      const options = {
        key: key_id,
        amount: order.amount,
        currency: "INR",
        name: "Tadoba Quick Payment",
        description: "Payment for services",
        order_id: order.id, // ✅ Razorpay still needs an order_id
        handler: async function (response) {
          console.log("🛠 Payment Response:", response);
          console.log("🛠 Order Data:", orderData);
          
          try {
            const verifyRes = await verifyPayment({
              order_id: response.razorpay_order_id,
              booking_id: bookingId,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
          });             
            console.log("✅ Verify Response:", verifyRes);

            if (verifyRes.success) {
              message.success("Payment successful!");
              navigate(
                `/payment-success?booking_id=${bookingId}&payment_id=${response.razorpay_payment_id}` // ✅ Passing `bookingId`
              );
            } else {
              message.error("Payment verification failed.");
            }
          } catch (error) {
            message.error("Payment verification error.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#3399cc",
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
      <Header />

      <div className="paymentHead">
        <h1>Payment</h1>
      </div>
      <section className="leaf">
        <div className="container">
          <div className="paymentbox">
            <h4>Payment Information</h4>
            <hr />

            <div className="paymentinput">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <label>
                    <span>Enter Amount</span>
                  </label>
                  <br />
                  <input type="text" name="amount" placeholder="Enter Amount" onChange={handleChange} />
                  <br />
                  <label>
                    <span>Enter Name</span>
                  </label>
                  <br />
                  <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} />
                  <br />
                  <label>
                    <span>Enter Email</span>
                  </label>
                  <br />
                  <input type="text" name="email" placeholder="Enter Email" onChange={handleChange} />
                  <br />
                  <label>
                    <span>Enter Mobile</span>
                  </label>
                  <br />
                  <input type="text" name="mobile" placeholder="Enter Mobile no" onChange={handleChange} />
                  <br />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <label>
                    <span>Enter Zip</span>
                  </label>
                  <br />
                  <input type="text" name="zip" placeholder="ZIP Code" onChange={handleChange} />
                  <br />
                  <label>
                    <span>Enter country Rupee</span>
                  </label>
                  <br />
                  <input type="text" disabled placeholder="INR Indian Rupee" />
                  <br />

                  <label>
                    <span>Enter City Name *</span>
                  </label>
                  <br />
                  <input type="text" name="city" placeholder="Enter City Name" onChange={handleChange} />

                  <br />
                  <label>
                    <span>Remark If any</span>
                  </label>
                  <br />
                  <input type="text" name="remark" placeholder="Enter remark" onChange={handleChange} />
                  <br />
                </div>
              </div>
              <button type="button" className="btn btn-primary mt-3" onClick={handlePayment}>
                Confirm Booking & Pay
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
