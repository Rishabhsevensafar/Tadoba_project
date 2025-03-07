const mongoose = require("mongoose")
const SafariBookingEnquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        date: { type: Date, required: true },
        safariZone: { type: String, required: true },
        vehicleType: { type: String, required: true, enum: ["Jeep"] },
        safariTime: { type: String, required: true, enum: ["6-10 AM", "2-6 PM"] },
        children: { type: Number, default: 0 },
        adults: { type: Number, required: true },
        status: { type: String, enum: ["Pending", "Success", "Not Interested", "No Response"], default: "Pending" }, // Admin can change status
        remark: { type: String, default: "" }, // Admin can add remark
    },
    { timestamps: true }
)
module.exports = mongoose.model("SafariBookingEnquiry", SafariBookingEnquirySchema);