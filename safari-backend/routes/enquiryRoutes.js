const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  addRemarkToEnquiry,
  createManualEnquiry,
  getStatusHistory,
} = require("../controllers/hotelenquiryController");
const { adminAuth } = require("../middleware/authMiddleware");

// Route to create enquiry (Public)
router.post("/", createEnquiry);

// Route to fetch all enquiries (Admin)
router.get("/", getAllEnquiries);

// Route to update enquiry status (Admin)
router.put("/:id/status", updateEnquiryStatus);

// Route to add remark to an enquiry (Admin)
router.put("/:id/remark", addRemarkToEnquiry);

router.post('/manual', adminAuth,  createManualEnquiry);
// Add this new route for status history
router.get('/status-history/:id', getStatusHistory);
module.exports = router;
