const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, handleWebhook } = require('../controllers/paymentController');

// Route for creating Razorpay order
router.post('/create-order', createOrder);

// Route for verifying payment (after the user completes the payment)
router.post('/verify-payment', verifyPayment);

// Use the handleWebhook function from the payment controller to process Razorpay events
router.post('/webhook', express.json(), handleWebhook);

module.exports = router;
