const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Store in environment variable
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Store in environment variable
});

const createOrder = async (req, res) => {
    try {
      const { amount, receipt } = req.body;
  
      // Ensure Razorpay API credentials are set
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return res.status(500).json({ success: false, error: "Razorpay API keys missing" });
      }
  
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
  
      const options = {
        amount: amount * 100, // Razorpay accepts amount in paise (INR 1 = 100 paise)
        currency: "INR",
        receipt,
        payment_capture: 1, // Auto-capture the payment
      };
  
      const order = await instance.orders.create(options);
      res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency });
    } catch (error) {
      console.error("Razorpay Order Error:", error);
      res.status(500).json({ success: false, error: "Payment Order Creation Failed" });
    }
  };
  

// 2️⃣ **Verify Payment API**
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, verifyPayment };
