const mongoose = require("mongoose");

const travelerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  nationality: { type: String, required: true },
  idType: { type: String, required: true }, // Aadhar, Passport, etc.
  idNumber: { type: String, required: true }, // ID Card Number
});

const SafariBookingSchema = new mongoose.Schema(
  {
    // Existing Fields
    bookingId: { type: String, unique: true }, // New field for custom ID 
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    safariZone: { type: String, required: true },
    vehicleType: { type: String, required: true, enum: ["Jeep", "Canter"] },
    safariTime: { type: String, required: true, enum: ["Morning", "Evening"] },
    children: { type: Number, default: 0 },
    adults: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    travelerDetails: [travelerSchema],

    // ✅ New Payment-Related Fields
    razorpayOrderId: { type: String }, // Razorpay का Order ID
    paymentId: { type: String }, // Razorpay Payment ID (जब payment success होता है)
    paymentStatus: { 
      type: String, 
      enum: ["Pending", "Success", "Failed", "Refunded"],
      default: "Pending" 
    },
    paymentSignature: { type: String }, // Razorpay Signature (Security के लिए)
    paymentDate: { type: Date }, // Payment कब हुआ
  },
  { timestamps: true }
);
SafariBookingSchema.pre("save", async function (next) {
  if (!this.bookingId) {
    const lastBooking = await this.constructor.findOne(
      {},
      { bookingId: 1 },
      { sort: { createdAt: -1 } }
    );

    let newNumber = 1;
    if (lastBooking && lastBooking.bookingId) {
      const lastNumber = parseInt(lastBooking.bookingId.replace("BOOK", ""));
      if (!isNaN(lastNumber)) {
        newNumber = lastNumber + 1;
      }
    }

    this.bookingId = `BOOK${String(newNumber).padStart(5, "0")}`;
  }
  next();
});

const SafariBooking =
  mongoose.models.SafariBooking || mongoose.model("SafariBooking", SafariBookingSchema);

module.exports = SafariBooking;