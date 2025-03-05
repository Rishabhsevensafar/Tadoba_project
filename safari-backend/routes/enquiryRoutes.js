const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  addRemarkToEnquiry,
} = require("../controllers/hotelenquiryController");

// Route to create enquiry (Public)
router.post("/", createEnquiry);

// Route to fetch all enquiries (Admin)
router.get("/", getAllEnquiries);

// Route to update enquiry status (Admin)
router.put("/:id/status", updateEnquiryStatus);

// Route to add remark to an enquiry (Admin)
router.put("/:id/remark", addRemarkToEnquiry);

module.exports = router;
