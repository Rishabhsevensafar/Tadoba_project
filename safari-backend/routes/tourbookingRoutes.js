const express = require("express");
const router = express.Router();
const Booking = require("../models/tourbooking");


// ✅ Create a new booking
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, idProof, package, hotel, checkInDate, checkOutDate, numPersons, numRooms, travelers, totalPrice, paymentStatus } = req.body;

    console.log("Received Booking Data:", req.body);  // ✅ Debugging ke liye

    const newBooking = new Booking({
      name,       // ✅ Lead Traveler Name
      email,      // ✅ Lead Traveler Email
      phone,      // ✅ Lead Traveler Phone
      address,    // ✅ Lead Traveler Address
      idProof,    // ✅ Lead Traveler ID Proof
      package,
      hotel,
      checkInDate,
      checkOutDate,
      numPersons,
      numRooms,
      travelers,  // ✅ Sirf additional travelers ka data save hoga
      totalPrice,
      paymentStatus,
    });

    await newBooking.save();
    console.log("Booking Saved Successfully:", newBooking);  // ✅ Console me save ka confirmation

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
          .populate("package")  // ✅ Populating Tour Package
          .populate("hotel");  // ✅ FIXED: Populating HotelPackage model correctly

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
    const { bookingId, paymentId } = req.body;  // ✅ No userId required

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    booking.paymentId = paymentId;  // ✅ Store Razorpay Payment ID
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
