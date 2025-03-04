const express = require("express");
const adminRoutes = require("./authRoutes");
const safaribookingRoutes = require("./safaribookingRoutes");
const paymentRoutes = require("./paymentRoutes");
const tourpackageRoutes = require("./tourpackageRoutes");
const hotelRoutes = require("./hotelpackageRoutes");
const tourEnquiryRoutes = require("./tourenquiryroutes");


const router = express.Router();


router.use("/admin", adminRoutes)
router.use("/booking", safaribookingRoutes)
router.use("/payment", paymentRoutes)
router.use("/tourpackage", tourpackageRoutes)
router.use("/hotel", hotelRoutes)
router.use("/tour", tourEnquiryRoutes); 
module.exports = router;
