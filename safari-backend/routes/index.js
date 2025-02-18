const express = require("express");
const adminRoutes = require("./authRoutes");
const safaribookingRoutes = require("./safaribookingRoutes");


const router = express.Router();


router.use("/admin", adminRoutes)
router.use("/booking", safaribookingRoutes)
module.exports = router;
