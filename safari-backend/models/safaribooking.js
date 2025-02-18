const mongoose = require("mongoose");

const travelerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  nationality: { type: String, required: true },
});

const safariBookingSchema = new mongoose.Schema(
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
    amountPaid: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    travelerDetails: [travelerSchema], // New field to store traveler information
  },
  { timestamps: true }
);

module.exports = mongoose.model("SafariBooking", safariBookingSchema);
