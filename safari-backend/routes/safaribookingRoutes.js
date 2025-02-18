const express = require("express");
const { createSafariBooking, getSafariBookings } = require("../controllers/safaribookingController");

const router = express.Router();

router.post("/create", createSafariBooking);
router.get("/", getSafariBookings);

module.exports = router;
