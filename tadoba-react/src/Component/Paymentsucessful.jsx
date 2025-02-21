import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get orderId from URL parameters
        const params = new URLSearchParams(location.search);
        const orderId = params.get('order_id');
        
        if (!orderId) {
          setPaymentStatus({
            success: false,
            message: "No order ID found in URL"
          });
          setLoading(false);
          return;
        }
        
        // Verify payment with backend
        const response = await fetch(`http://localhost:5000/api/payment/verify-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId })
        });
        
        const data = await response.json();
        setPaymentStatus(data);
        
        // If payment successful, update booking status
        if (data.success) {
          // Extract bookingId from orderId (assuming format: SAFARI_bookingId_timestamp)
          const bookingId = orderId.split('_')[1];
          
          // Update booking status to confirmed
          await fetch(`http://localhost:5000/api/payment/booking/${bookingId}/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setPaymentStatus({
          success: false,
          message: "Failed to verify payment"
        });
      } finally {
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, [location.search]);
  
  if (loading) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3">Verifying your payment...</h3>
      </div>
    );
  }
  
  return (
    <div className="container my-5">
      <div className={`card p-5 ${paymentStatus?.success ? 'border-success' : 'border-danger'}`}>
        <div className="text-center mb-4">
          {paymentStatus?.success ? (
            <div className="display-1 text-success">✓</div>
          ) : (
            <div className="display-1 text-danger">✗</div>
          )}
          
          <h2 className={paymentStatus?.success ? 'text-success' : 'text-danger'}>
            {paymentStatus?.success ? 'Payment Successful!' : 'Payment Failed'}
          </h2>
          
          <p className="lead">{paymentStatus?.message}</p>
          
          {paymentStatus?.success && (
            <div className="alert alert-success mt-4">
              <p>Your safari booking is now confirmed! You will receive an email with booking details shortly.</p>
              <p>Please keep the confirmation email for your records and present it upon arrival.</p>
            </div>
          )}
          
          {!paymentStatus?.success && (
            <div className="alert alert-warning mt-4">
              <p>We couldn't confirm your payment. This could be due to:</p>
              <ul className="text-start">
                <li>Insufficient funds</li>
                <li>Payment was cancelled</li>
                <li>Technical issue with the payment gateway</li>
              </ul>
              <p>Please try again or contact our support team for assistance.</p>
            </div>
          )}
          
          <div className="mt-4">
            <button 
              className="btn btn-primary me-3"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </button>
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;