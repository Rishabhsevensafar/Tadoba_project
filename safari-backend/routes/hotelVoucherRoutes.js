// routes/hotelvoucher.js
const express = require("express");
const router = express.Router();
const HotelVoucher = require("../models/hotelVoucher");

router.post("/create", async (req, res) => {
    try {
      const newVoucher = new HotelVoucher(req.body);
      await newVoucher.save();
      res.status(201).json({ success: true, voucher: newVoucher });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save hotel voucher" });
    }
  });

  module.exports = router;