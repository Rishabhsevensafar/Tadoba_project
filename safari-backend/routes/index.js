const express = require("express");
const adminRoutes = require("./authRoutes");
const safaribookingRoutes = require("./safaribookingRoutes");
const paymentRoutes = require("./paymentRoutes");
const tourpackageRoutes = require("./tourpackageRoutes");
const hotelRoutes = require("./hotelpackageRoutes");
const tourEnquiryRoutes = require("./tourenquiryRoutes");
const enquiryRoutes = require("./enquiryRoutes")
const tourbookingRoutes = require("./tourbookingRoutes")
const tourpaymentRoutes = require("./tourpaymentRoutes")
const safarienquiryRoutes = require("./safarienqruiyRoutes")
const contactRoutes = require("./contactRoutes")
const blogRoutes = require("./blogRoutes")
const quickpaymentRoutes = require("./quickpaymentRoutes")
const router = express.Router();

router.use("/admin", adminRoutes)
router.use("/booking", safaribookingRoutes)
router.use("/payment", paymentRoutes)
router.use("/tourpackage", tourpackageRoutes)
router.use("/hotel", hotelRoutes)
router.use("/tour", tourEnquiryRoutes); 
router.use("/hotelenquiry", enquiryRoutes)
router.use("/tourbooking", tourbookingRoutes)
router.use("/tourpayment", tourpaymentRoutes)
router.use("/safarienquiry", safarienquiryRoutes)
router.use("/contactenquiry", contactRoutes)
router.use("/blogs", blogRoutes)
router.use("/quick-payment",quickpaymentRoutes)
module.exports = router;
