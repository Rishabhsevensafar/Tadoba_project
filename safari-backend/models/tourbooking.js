const mongoose = require("mongoose");
// const { type } = require("os");

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  phone: { type: String, required: true }, 
  address:{type: String, required:true},
  idProof:{type:String, required:true},
  package: { type: mongoose.Schema.Types.ObjectId, ref: "TourPackage" },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  numPersons: { type: Number, required: true },
  numRooms: { type: Number, required: true },
  travelers: [{ name: String, phone: String, idProof: String }],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  paymentId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("TourBooking", BookingSchema);
