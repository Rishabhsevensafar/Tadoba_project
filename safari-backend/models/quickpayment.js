const mongoose = require("mongoose");

const QuickPaymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  city: String,
  amount: Number,
  zip: String,
  currency: { type: String, default: "INR" },
  status: { type: String, enum: ["Success", "Pending", "Failed"], default: "Pending" }, 
  paymentId: String, // ✅ Updated: Stores Razorpay payment ID after verification
  bookingId: String, // ✅ Changed from orderId to bookingId
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("QuickPayment", QuickPaymentSchema);
