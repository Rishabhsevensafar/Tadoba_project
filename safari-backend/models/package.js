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
      },
    ],
    includes: [{ type: String }], 
    excludes: [{ type: String }], 
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TourPackage", tourPackageSchema);
