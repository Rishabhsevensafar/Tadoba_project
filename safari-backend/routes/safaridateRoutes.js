// routes/booking.js
const express = require('express');
const router = express.Router();
const BookingConfig = require('../models/bookingConfig');
const { adminAuth } = require('../middleware/authMiddleware');

// Get current configuration
router.get('/config', async (req, res) => {
  try {
    let config = await BookingConfig.findOne();
    if (!config) {
      // Create default config if none exists
      config = new BookingConfig({
        cutOffTime: "17:00",
        blockedDates: []
      });
      await config.save();
    }
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update configuration (admin only)
router.put('/config', adminAuth, async (req, res) => {
  try {
    const { cutOffTime, blockedDates } = req.body;
    
    // Validate cutOffTime format (HH:MM)
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(cutOffTime)) {
      return res.status(400).json({ error: "Invalid time format. Use HH:MM" });
    }
    
    // Validate blockedDates are valid dates
    const validDates = blockedDates.every(date => !isNaN(new Date(date).getTime()));
    if (!validDates) {
      return res.status(400).json({ error: "Invalid date format in blocked dates" });
    }
    
    let config = await BookingConfig.findOne();
    if (!config) {
      config = new BookingConfig({ cutOffTime, blockedDates });
    } else {
      config.cutOffTime = cutOffTime;
      config.blockedDates = blockedDates;
    }
    
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;