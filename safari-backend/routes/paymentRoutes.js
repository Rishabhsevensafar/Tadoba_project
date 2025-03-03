const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, handleWebhook } = require('../controllers/paymentController');
const Booking = require('../models/safaribooking'); 

router.post('/create-order', createOrder);

router.post('/verify-payment', verifyPayment);

router.post('/webhook', express.json(), async (req, res) => {
  try {
    const webhookData = req.body;

    console.log("Webhook received:", webhookData);

    if (!webhookData || !webhookData.eventType || !webhookData.orderId) {
      return res.status(400).json({ success: false, message: "Invalid webhook data" });
    }

    if (webhookData.eventType === "ORDER_PAID") {
      const orderId = webhookData.orderId;

      const bookingId = orderId.split('_')[1];

      if (!bookingId) {
        console.warn(`Booking ID could not be extracted from orderId: ${orderId}`);
        return res.status(400).json({ success: false, message: "Invalid order ID format" });
      }

      // Update booking status
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { 
          status: 'confirmed',
          paymentStatus: 'paid',
          updatedAt: new Date()
        },
        { new: true }
      );

      if (!updatedBooking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
      console.log(`Booking ${bookingId} confirmed via webhook`);

      return res.status(200).json({ success: true, message: "Webhook processed successfully" });
    }

    res.status(400).json({ success: false, message: "Unhandled event type" });
  } catch (error) {
    console.error("Webhook Processing Error:", error);
    res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
});

// Additional route to confirm booking after successful payment
router.post('/booking/:bookingId/confirm', async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Update booking status to confirmed
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { 
        status: 'confirmed',
        paymentStatus: 'paid',
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      message: "Booking confirmed successfully",
      booking: updatedBooking
    });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm booking"
    });
  }
});
module.exports = router;
