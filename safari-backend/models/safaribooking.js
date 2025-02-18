const mongoose = require("mongoose");

const safariBookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    safariZone: { type: String, required: true },
    travellers: [{ name: String, age: Number, idType: String, idNumber: String }],
    amountPaid: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("SafariBooking", safariBookingSchema);
// Compare this snippet from safari-backend/app.js: