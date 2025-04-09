// models/HotelVoucher.js
const mongoose = require("mongoose");

const HotelVoucherSchema = new mongoose.Schema({
  enquiryId: { type: mongoose.Schema.Types.ObjectId, ref: "Enquiry" },
  bookingId: String,
  noOfPersons: String,
  checkInDate: Date,
  checkOutDate: Date,
  rooms: String,
  meal: String,
  country: String,
  city: String,
  address: String,
  duePayment: String,
  hotelContact: String,
}, { timestamps: true });

module.exports = mongoose.model("HotelVoucher", HotelVoucherSchema);
