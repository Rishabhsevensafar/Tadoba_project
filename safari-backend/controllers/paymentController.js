const axios = require("axios");
require("dotenv").config();

const BASE_URL =
  process.env.CASHFREE_ENV === "PROD"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";
    const headers = {
      "Content-Type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID?.trim(),
      "x-client-secret": process.env.CASHFREE_SECRET_KEY?.trim(),
      "x-api-version": "2022-09-01",
    };


const createOrder = async (req, res) => {
  try {
    const { amount, orderId, customerId,customerName, customerEmail, customerPhone } = req.body;

    const orderData = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      order_note: "Payment for tour package",
      customer_details: {
        customer_id: customerId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      order_meta: {
        return_url: `http://localhost:5173/payment-success?order_id=${orderId}`,
        notify_url: "http://localhost:5000/webhook",
      },
    };

    const response = await axios.post(`${BASE_URL}/orders`, orderData, { headers });

    console.log("Cashfree Response:", response.data);
    console.log("Using API ID:", process.env.CASHFREE_APP_ID);
    console.log("Using API Secret:", process.env.CASHFREE_SECRET_KEY);
    console.log("Using API Version:", process.env.CASHFREE_ENV );


    if (response.data && response.data.payment_session_id) {
      const validSessionId = response.data.payment_session_id.replace(/paymentpayment$/, '');

      // Generate a payment link
      const paymentLink = response.data.payments.url;
    
      console.log("✅ Valid Session ID:", validSessionId); // Debugging log    

      res.json({
        success: true,
        paymentSessionId: response.data.payment_session_id,
        orderId: response.data.order_id,
        paymentLink, 
      });
    } else {
      throw new Error("Order creation failed or response format unexpected");
    }
  } catch (error) {
    console.error("Cashfree Order Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Payment Order Creation Failed" });
  }
};

// payment.controller.js

const verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const headers = {
      "Content-Type": "application/json",
      "x-client-id": process.env.CASHFREE_APP_ID?.trim(),
      "x-client-secret": process.env.CASHFREE_SECRET_KEY?.trim(),
      "x-api-version": "2022-09-01",
    };

    console.log("Verifying payment for order:", orderId);
    const response = await axios.get(`${BASE_URL}/orders/${orderId}/payments`, { headers });

    if (response.data && response.data.payment_status === "SUCCESS") {
      res.json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    console.error("Cashfree Payment Verification Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Payment verification failed!" });
  }
};



// 3️⃣ **Webhook handler for payment notifications**
const handleWebhook = async (req, res) => {
  try {

    const webhookData = req.body;

    // Verify webhook signature (if using HMAC verification)
    const signature = req.headers["x-webhook-signature"];
    if (!signature) {
      return res.status(403).json({ success: false, message: "Invalid signature" });
    }
    if (webhookData.event_type === "ORDER_PAID") {
      console.log(`Order ${webhookData.order_id} has been paid`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).json({ success: false });
  }
};

module.exports = { createOrder, verifyPayment, handleWebhook };