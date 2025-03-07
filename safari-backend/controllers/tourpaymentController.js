const Razorpay = require("razorpay");
const Booking = require("../models/tourbooking");

// ✅ Load environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
// ✅ Initiate a payment
exports.createOrder = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;
    const options = {
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      receipt: `booking_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment initiation failed", error });
  }
};

// ✅ Handle payment success
exports.verifyPayment = async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: "paid",
      transactionId: paymentId,
    });
    res.status(200).json({ success: true, message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment verification failed", error });
  }
};
