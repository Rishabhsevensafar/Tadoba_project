    const SafariBooking = require("../models/safaribooking");


    const createSafariBooking = async (req, res) => {
        try {
            const {
                name, email, phone, date, safariZone, vehicleType, safariTime, children, adults, amountPaid
            } = req.body;

            if (!name || !email || !phone || !date || !safariZone || !vehicleType || !safariTime || !adults || !amountPaid) {
                return res.status(400).json({ error: "All required fields must be filled." });
            }

            const newBooking = new SafariBooking({
                name, email, phone, date, safariZone, vehicleType, safariTime, children, adults, amountPaid
            });

            await newBooking.save();

            // ✅ Ensure the response contains the booking ID
            res.status(201).json({
                message: "Safari booking successful",
                booking: {
                    bookingId: newBooking._id, // Send ID explicitly
                    ...newBooking._doc
                }
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    const addTravelerDetails = async (req, res) => {
        try {
          const { id } = req.params; // Booking ID
          const { travelers } = req.body;
      
          // Validate traveler details
          for (const traveler of travelers) {
            if (!traveler.fullName || !traveler.age || !traveler.gender || !traveler.nationality || !traveler.idType || !traveler.idNumber) {
              return res.status(400).json({ error: "All traveler details are required." });
            }
          }
      
          // Changed from findById to findOne with bookingId
          const booking = await SafariBooking.findOne({ bookingId: id });
          if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
          }
      
          booking.travelerDetails = travelers;
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
// controllers/safariBookingController.js में ये function add करें
const updateSafariBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const booking = await SafariBooking.findByIdAndUpdate(id, updatedData, {
            new: true, // Updated document return करेगा
            runValidators: true // Schema validations check करेगा
        });

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking updated successfully",
            booking
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
    module.exports = { createSafariBooking,addTravelerDetails, getSafariBookings, getSafariBookingById, deleteSafariBooking, updateSafariBooking };
