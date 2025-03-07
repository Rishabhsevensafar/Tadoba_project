const mongoose = require("mongoose");

const tourBookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    idProof: { type: String, required: true },
    package: { type: mongoose.Schema.Types.ObjectId, ref: "TourPackage", required: true },  // ✅ Reference Correct Package Model
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "HotelPackage", required: true },  // ✅ FIXED: Reference HotelPackage Model
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numPersons: { type: Number, required: true },
    numRooms: { type: Number, required: true },
    travelers: [
        {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            idProof: { type: String, required: true }
        }
    ],
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("TourBooking", tourBookingSchema);
