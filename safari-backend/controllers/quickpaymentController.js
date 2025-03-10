const QuickPayment = require("../models/quickpayment");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

exports.createOrder = async (req, res) => {
    try {
        const { name, email, mobile, city, zip, amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt: `quick_payment_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        const newPayment = new QuickPayment({
            name,
            email,
            mobile,
            city,
            zip,
            amount,
            status: "Pending",
            bookingId: `BOOK${Date.now()}`, // Generate a unique booking ID
            paymentId: "", // Initially empty, updated after payment
        });

        await newPayment.save();

        res.status(200).json({ success: true, order, key_id: process.env.RAZORPAY_KEY_ID, bookingId: newPayment.bookingId });
    } catch (error) {
        res.status(500).json({ success: false, message: "Payment initiation failed", error: error.message });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { booking_id, payment_id, signature } = req.body; // ✅ Changed from order_id to booking_id

        if (!booking_id || !payment_id || !signature) {
            return res.status(400).json({ success: false, message: "Missing parameters" });
        }

        // Fetch order details from DB using **bookingId**
        const payment = await QuickPayment.findOne({ bookingId: booking_id });

        if (!payment) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        // Verify Razorpay Signature
        const secret = process.env.RAZORPAY_SECRET;
        const generated_signature = crypto
            .createHmac("sha256", secret)
            .update(booking_id + "|" + payment_id)
            .digest("hex");

        if (generated_signature !== signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        // ✅ Update Payment in Database
        payment.paymentId = payment_id;
        payment.status = "Success"; // Mark as successful
        await payment.save();

        res.status(200).json({ success: true, message: "Payment Verified Successfully!", payment });
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ success: false, message: "Server error while verifying payment" });
    }
};

// ✅ Fetch all payments for Admin Panel
exports.getAllPayments = async (req, res) => {
    try {
        const { startDate, endDate, status } = req.query;
        let query = {};

        if (startDate && endDate) {
            query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (status) {
            query.status = status;
        }

        const payments = await QuickPayment.find(query).sort({ createdAt: -1 });

        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ success: false, message: "Error fetching payments" });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["Success", "Pending", "Failed"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const updatedPayment = await QuickPayment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        res.status(200).json({ success: true, message: "Payment status updated", payment: updatedPayment });
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ success: false, message: "Failed to update payment status" });
    }
};
