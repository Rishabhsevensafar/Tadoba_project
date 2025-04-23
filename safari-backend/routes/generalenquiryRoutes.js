const express = require("express");
const router = express.Router();
const uaParser = require("ua-parser-js");
const GeneralEnquiry = require("../models/generalenquiry");

// ✅ Submit Enquiry (Frontend Floating Form)
router.post("/submit-enquiry", async (req, res) => {
  try {
    const ua = uaParser(req.headers["user-agent"]);
    const logDetails = {
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      browser: ua.browser.name + " " + ua.browser.version,
      device: ua.device.type || "Desktop",
      userAgent: req.headers["user-agent"]
    };

    const newEnquiry = new GeneralEnquiry({ ...req.body, logDetails });
    await newEnquiry.save();

    res.status(201).json({ success: true, message: "Enquiry submitted" });
  } catch (err) {
    console.error("❌ Enquiry Submission Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ Get All Enquiries (Admin Panel)
router.get("/all-enquiries", async (req, res) => {
  try {
    const enquiries = await GeneralEnquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, enquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch enquiries" });
  }
});

module.exports = router;