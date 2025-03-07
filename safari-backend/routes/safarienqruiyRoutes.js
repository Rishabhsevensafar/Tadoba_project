const express = require("express");
const router = express.Router();

// ✅ Make sure this import is correct
const { createEnquiry, getAllSafariEnquiries, updateEnquiry } = require("../controllers/safarienquiryController");

// ✅ Fix the routes by making sure functions are defined
router.post("/create", createEnquiry);  // ✅ Should be defined in the controller
router.get("/", getAllSafariEnquiries);
router.put("/update-status/:id", updateEnquiry);

module.exports = router;
