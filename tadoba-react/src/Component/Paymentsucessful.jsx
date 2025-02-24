import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
        try {
          const params = new URLSearchParams(location.search);
          const orderId = params.get("order_id");
      
          if (!orderId) {
            setPaymentStatus({ success: false, message: "No order ID found in URL" });
            setLoading(false);
            return;
          }
      
          // ✅ Send request to your backend instead of Cashfree
          const response = await fetch(`http://localhost:5000/api/payment/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });
      
          const data = await response.json();
          setPaymentStatus(data);
        } catch (error) {
          console.error("Payment verification error:", error);
          setPaymentStatus({ success: false, message: "Failed to verify payment" });
        } finally {
          setLoading(false);
        }
      };
      
    verifyPayment();
  }, [location.search]);

  if (loading) {
    return <div>Verifying payment...</div>;
  }

  return (
    <div>
      <h2>
        {paymentStatus?.success ? "Payment Successful!" : "Payment Failed"}
      </h2>
      <p>{paymentStatus?.message}</p>
      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
}

export default PaymentSuccess;
