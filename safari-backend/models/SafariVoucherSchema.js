const mongoose = require("mongoose");

const SafariVoucherSchema = new mongoose.Schema({
  enquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SafariEnquiry",
    required: true,
  },
  bookingId: String,
  safariPerson: String,
  safariPhone: String,
  permitUrl: String, // URL of uploaded permit file
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SafariVoucher", SafariVoucherSchema);
