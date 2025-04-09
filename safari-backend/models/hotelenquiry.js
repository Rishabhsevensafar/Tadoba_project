const mongoose = require("mongoose");

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  changedAt: { type: Date, default: Date.now },
  remark: { type: String }
});

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
    statusHistory: [statusHistorySchema], // Add status history array
    isManual: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", enquirySchema);