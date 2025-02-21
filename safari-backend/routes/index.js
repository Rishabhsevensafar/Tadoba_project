const express = require("express");
const adminRoutes = require("./authRoutes");
const safaribookingRoutes = require("./safaribookingRoutes");
const paymentRoutes = require("./paymentRoutes");


const router = express.Router();


router.use("/admin", adminRoutes)
router.use("/booking", safaribookingRoutes)
router.use("/payment", paymentRoutes)
module.exports = router;
