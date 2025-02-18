const SafariBooking = require("../models/safariBooking");

// Create a new Safari booking
const createSafariBooking = async (req, res) => {
    try {
        console.log("Received booking data:", req.body); // 🛠 Debugging log

        const {
            name,
            email,
            phone,
            date,
            safariZone,
            vehicleType,
            safariTime,
            children,
            adults,
            amountPaid,
        } = req.body;

        if (!name || !email || !phone || !date || !safariZone || !vehicleType || !safariTime || !adults || !amountPaid) {
            console.log("Missing fields!"); // 🛠 Debugging log
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        const newBooking = new SafariBooking({
            name,
            email,
            phone,
            date,
            safariZone,
            vehicleType,
            safariTime,
            children,
            adults,
            amountPaid,
        });

        await newBooking.save();
        res.status(201).json({ message: "Safari booking successful", booking: newBooking });
    } catch (error) {
        console.error("Error saving booking:", error);
        res.status(500).json({ error: error.message });
    }
};

const addTravelerDetails = async (req, res) => {
    try {
        const { id } = req.params; // Booking ID
        const { travelers } = req.body; // Array of traveler details

        // Validate traveler details
        for (const traveler of travelers) {
            if (!traveler.fullName || !traveler.age || !traveler.gender || !traveler.nationality || !traveler.idType || !traveler.idNumber) {
                return res.status(400).json({ error: "All traveler details are required." });
            }
        }

        const booking = await SafariBooking.findById(id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        booking.travelerDetails = travelers; // Add traveler details
        await booking.save();

        res.status(200).json({ message: "Traveler details added successfully", booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

// Get a single Safari booking by ID
const getSafariBookingById = async (req, res) => {
    try {
        const booking = await SafariBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Safari booking
const deleteSafariBooking = async (req, res) => {
    try {
        const booking = await SafariBooking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createSafariBooking,addTravelerDetails, getSafariBookings, getSafariBookingById, deleteSafariBooking };
