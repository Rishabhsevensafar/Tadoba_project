const express = require("express");
const router = express.Router();
const SafariVoucher = require("../models/SafariVoucherSchema");

router.post("/create", async (req, res) => {
  try {
    const voucher = new SafariVoucher(req.body);
    await voucher.save();
    res.status(201).json({ success: true, voucher });
  } catch (error) {
    console.error("Voucher creation failed", error);
    res.status(500).json({ success: false, message: "Error creating voucher" });
  }
});

module.exports = router;
