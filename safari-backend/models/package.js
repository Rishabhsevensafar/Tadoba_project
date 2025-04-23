const mongoose = require("mongoose");

const tourPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, 
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalSeats: { type: Number, required: true },
    images: [{ type: String }], 
    itinerary: [
      {
        title: { type: String, required: true },
        activities: { type: String, required: true },
        image: { type: String }, // ✅ New field for itinerary image
      },
    ],
    includes: [{ type: String }], 
    excludes: [{ type: String }], 
    // ✅ NEW FIELD: Hotels associated with the package
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "HotelPackage" }], // Reference to hotels
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TourPackage", tourPackageSchema);
