const express = require("express");
const adminRoutes = require("./authRoutes");
const bookingRoutes = require("./bookingRoutes");


const router = express.Router();


router.use("/admin", adminRoutes)
router.use("/booking", bookingRoutes)
module.exports = router;
