const mongoose = require("mongoose");

const generalEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  enquiryType: { type: String, enum: ["Tour", "Hotel", "Safari"], required: true },
  location: { type: String, required: true },
  message: { type: String, required: true },
  logDetails: {
    ip: String,
    browser: String,
    device: String,
    userAgent: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GeneralEnquiry", generalEnquirySchema);
