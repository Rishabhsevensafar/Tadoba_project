const mongoose = require("mongoose");

const tourEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  message: { type: String, required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "HotelPackage" },  // ✅ Reference Hotel
  package: { type: mongoose.Schema.Types.ObjectId, ref: "TourPackage" }, // ✅ Reference Packa
  status: { type: String, enum: ["Pending", "Success", "Not Interested", "No Response" ], default: "Pending" }, // Admin can change status
  remark: { type: String, default: "" }, // Admin can add remark
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true }); 

module.exports = mongoose.model("TourEnquiry", tourEnquirySchema);
