const express = require("express");
const { createOrder, verifyPayment, getAllPayments, updatePaymentStatus } = require("../controllers/quickpaymentController");

const router = express.Router();

router.post("/create-order", createOrder);  // ✅ Create order
router.post("/verify-payment", verifyPayment);  // ✅ Verify payment
router.get("/all", getAllPayments);  // ✅ Fetch payments for admin
router.put("/update-status/:id", updatePaymentStatus);  // ✅ Update payment status

module.exports = router;
