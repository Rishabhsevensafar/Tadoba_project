const Razorpay = require('razorpay');
const axios = require("axios");
require("dotenv").config();
const crypto = require("crypto");
const SafariBooking = require("../models/safaribooking");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,   // Your Razorpay Key ID
  key_secret: process.env.RAZORPAY_SECRET // Your Razorpay Secret Key
});

// **Create an order with Razorpay**
const createOrder = async (req, res) => {
  try {
    const { amount, customerId } = req.body; // customerId = Booking ID

    const orderData = {
      amount: amount * 100,
      currency: "INR",
      receipt: `safari_booking_${customerId}`,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(orderData);

    // Changed from findByIdAndUpdate to findOneAndUpdate
    await SafariBooking.findOneAndUpdate(
      { bookingId: customerId }, // Use your custom bookingId field
      { razorpayOrderId: order.id },
      { new: true }
    );

    res.json({
      success: true,
      orderId: order.id,
      paymentLink: `https://checkout.razorpay.com/v1/checkout/embedded/${order.id}`,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ success: false, message: "Payment Order Creation Failed" });
  }
};
const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    // Razorpay Signature Verify करें
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Invalid Payment Signature!" });
    }

    // ✅ Booking को Database में Update करें
    const booking = await SafariBooking.findOneAndUpdate(
      { razorpayOrderId: orderId }, // Razorpay Order ID से Booking ढूंढें
      {
        paymentStatus: "Success",
        paymentId: paymentId,
        paymentSignature: signature,
        paymentDate: new Date(),
      },
      { new: true } // Updated Document Return करेगा
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found!" });
    }

    res.json({ 
      success: true, 
      message: "Payment Verified & Booking Confirmed!",
      bookingId: booking.bookingId,
      booking 
    });

  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed!" });
  }
};
// Webhook handler for Razorpay to handle payment notifications
const handleWebhook = async (req, res) => {
  try {
    const webhookData = req.body;

    // Verify webhook signature
    const signature = req.headers["x-razorpay-signature"];
    if (!signature) {
      return res.status(403).json({ success: false, message: "Invalid signature" });
    }

    // Assuming webhookData.event contains the event type
    if (webhookData.event === "payment.captured") {
      console.log(`Payment for Order ${webhookData.payload.payment.entity.order_id} was successful`);
      // Handle successful payment
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Razorpay Webhook Error:", error);
    res.status(500).json({ success: false });
  }
};

module.exports = { createOrder, verifyPayment, handleWebhook };
