const SafariBooking = require("../models/safariBooking");

// Create a new Safari booking
const createSafariBooking = async (req, res) => {
    try {
        const newBooking = new SafariBooking(req.body);
        await newBooking.save();
        res.status(201).json({ message: "Safari booking successful", booking: newBooking });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all Safari bookings
const getSafariBookings = async (req, res) => {
    try {
        const bookings = await SafariBooking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createSafariBooking, getSafariBookings };