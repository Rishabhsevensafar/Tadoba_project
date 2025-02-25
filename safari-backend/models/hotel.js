const mongoose = require('mongoose');

const HotelPackageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: {
        type: [String], // Array of image URLs
        validate: [arrayLimit, '{PATH} exceeds the limit of 10 images']
    },
    location: {
        name: { type: String, required: true },
        pincode: { type: String, required: true }
    },
    room_type: { type: String, required: true },
    number_of_stars: { type: Number, required: true, min: 1, max: 5 },
    amenities: [{ type: String }], // List of amenities
    facilities: [{ type: String }], // List of facilities
    real_price: { type: Number, required: true }, // Original price
    discounted_price: { type: Number, required: true }, // Discounted price
    map_location: { type: String, required: true } // Google Maps link or coordinates
}, { timestamps: true });

// Validation to limit the number of images
function arrayLimit(val) {
    return val.length <= 10;
}

module.exports = mongoose.model('HotelPackage', HotelPackageSchema);
