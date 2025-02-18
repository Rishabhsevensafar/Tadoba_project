const Booking = require("../models/booking");

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createBooking, getBookings };
