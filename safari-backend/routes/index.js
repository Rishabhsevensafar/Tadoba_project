const express = require("express");
const adminRoutes = require("./authRoutes");


const router = express.Router();


router.use("/admin", adminRoutes)
module.exports = router;
