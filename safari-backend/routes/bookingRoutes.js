const express = require("express");
const { createBooking, getBookings } = require("../controllers/bookingController");

const router = express.Router();

router.post("booking/create", createBooking);
router.get("booking/", getBookings);

module.exports = router;
