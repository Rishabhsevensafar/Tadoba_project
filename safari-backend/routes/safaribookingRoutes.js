const express = require("express");
const {
  createSafariBooking,
  getSafariBookings,
  getSafariBookingById,
  deleteSafariBooking,
  addTravelerDetails,
  updateSafariBooking,
} = require("../controllers/safaribookingController");

const router = express.Router();

router.post("/book", createSafariBooking);
router.post("/:id/travelers", addTravelerDetails); // Route to add traveler details
router.get("/", getSafariBookings);
router.get("/:id", getSafariBookingById);
router.delete("/:id", deleteSafariBooking);
router.put('/update/:id', updateSafariBooking); // <-- नई route
module.exports = router;
