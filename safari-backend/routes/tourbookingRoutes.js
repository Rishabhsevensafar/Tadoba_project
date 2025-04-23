const express = require("express");
const router = express.Router();
const Booking = require("../models/tourbooking");

// ✅ Create a new booking
router.post("/", async (req, res) => {
  try {
    const {
      name, email, phone, address, idProof,
      package: tourPackage, hotel, checkInDate, checkOutDate,
      numPersons, numRooms, travelers, totalPrice, paymentStatus
    } = req.body;

    console.log("Received Booking Data:", req.body);

    const newBooking = new Booking({
      name,
      email,
      phone,
      address,
      idProof,
      package: tourPackage,  // ✅ Use 'tourPackage' here, still stored in 'package' field in DB
      hotel,
      checkInDate,
      checkOutDate,
      numPersons,
      numRooms,
      travelers,
      totalPrice,
      paymentStatus,
    });

    await newBooking.save();
    console.log("Booking Saved Successfully:", newBooking);

    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, message: "Failed to create booking", error });
  }
});

// ✅ Get all bookings
router.get("/", async (req, res) => {
  try {
    console.log("Fetching bookings...");

    const bookings = await Booking.find()
      .populate("package") // ✅ populate 'package' field
      .populate("hotel");

    console.log("Fetched bookings:", bookings);
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// ✅ Get single booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user package hotel");
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

// ✅ Update booking status (payment status)
router.put("/:id/status", async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    booking.paymentId = paymentId;
    await booking.save();

    res.status(200).json({ success: true, message: "Payment successful", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update payment status", error });
  }
});

// ✅ Delete a booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

module.exports = router;
