const express = require("express");
const { 
  createTourEnquiry, 
  getAllTourEnquiries, 
  updateEnquiry 
} = require("../controllers/tourenquiryController");

const router = express.Router();

router.post("/tour-enquiry", createTourEnquiry); // ✅ User submits enquiry
router.get("/tour-enquiries", getAllTourEnquiries); // ✅ Admin Fetches All Enquiries
router.put("/tour-enquiry/:id", updateEnquiry); // ✅ Admin Updates Enquiry
module.exports = router;
