const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "HotelPackage", required: true },
    status: {
      type: String,
      enum: ["pending", "resolved", "rejected"],
      default: "pending",
    },
    remark: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
