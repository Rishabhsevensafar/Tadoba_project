const express = require("express");
const router = express.Router();

// ✅ Make sure this import is correct
const { createEnquiry, getAllSafariEnquiries, updateEnquiry, createManualEnquiry, getStatusHistory } = require("../controllers/safarienquiryController");
const { adminAuth } = require("../middleware/authMiddleware");

// ✅ Fix the routes by making sure functions are defined
router.post("/create", createEnquiry);  // ✅ Should be defined in the controller
router.get("/", getAllSafariEnquiries);
router.put("/update-status/:id", updateEnquiry);
router.post('/manual', adminAuth, createManualEnquiry); // ✅ Should be defined in the controller
// Get status history for a specific enquiry
router.get('/status-history/:id', getStatusHistory);
module.exports = router;
