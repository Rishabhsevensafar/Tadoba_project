import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Result,
  Button,
  Spin,
  Typography,
  Card,
  Space,
  Divider,
  Steps,
  Alert,
} from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CreditCardOutlined,
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const bookingId = params.get('booking_id');
        const paymentId = params.get('payment_id');
    
        if (!bookingId) {
          setPaymentStatus({ success: false, message: "No booking ID found in URL" });
          setLoading(false);
          return;
        }
    
        // Use the new endpoint that only requires booking_id
        const response = await fetch(`http://localhost:5001/api/quick-payment/payment-status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ booking_id: bookingId })
        });
    
        const data = await response.json();
        setPaymentStatus(data);
        setPaymentDetails(data.payment);
      } catch (error) {
        console.error("Payment status check error:", error);
        setPaymentStatus({ success: false, message: "Failed to verify payment status" });
      } finally {
        setLoading(false);
      }
    };
    
    checkPaymentStatus();
  }, [location.search]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <Spin size="large" />
        <Title level={4} style={{ marginTop: 24 }}>
          Verifying your payment...
        </Title>
        <Paragraph type="secondary">
          Please wait while we confirm your transaction
        </Paragraph>
      </div>
    );
  }

  // Get payment date from response or use current date as fallback
  const paymentDate = paymentDetails?.date 
    ? new Date(paymentDetails.date).toLocaleString()
    : new Date().toLocaleString();

  // Get payment ID from URL or generate a display transaction ID
  const params = new URLSearchParams(location.search);
  const displayPaymentId = params.get('payment_id') || 
    (paymentStatus?.success ? `TXN${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}` : "N/A");

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      <Card
        bordered={false}
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "30px 0",
            textAlign: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Result
            icon={
              paymentStatus?.success ? (
                <CheckCircleFilled style={{ color: "#52c41a", fontSize: 72 }} />
              ) : (
                <CloseCircleFilled style={{ color: "#ff4d4f", fontSize: 72 }} />
              )
            }
            title={
              <Title level={2} style={{ margin: "16px 0" }}>
                {paymentStatus?.success
                  ? "Payment Successful!"
                  : "Payment Failed"}
              </Title>
            }
            subTitle={
              paymentStatus?.success && paymentDetails?.name 
                ? `Thank you, ${paymentDetails.name}!` 
                : paymentStatus?.message
            }
            status={paymentStatus?.success ? "success" : "error"}
          />
        </div>

        <div style={{ padding: "24px" }}>
          {paymentStatus?.success && (
            <>
              <div
                style={{
                  background: "#f6ffed",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}
              >
                <Space
                  direction="vertical"
                  size="small"
                  style={{ width: "100%" }}
                >
                  <Text strong>Transaction Details:</Text>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text>Transaction ID:</Text>
                    <Text code>{displayPaymentId}</Text>
                  </div>
                  {paymentDetails?.name && (
                    <div
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <Text><UserOutlined style={{ marginRight: 8 }} />Customer Name:</Text>
                      <Text strong>{paymentDetails.name}</Text>
                    </div>
                  )}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text>Date & Time:</Text>
                    <Text>{paymentDate}</Text>
                  </div>
                  {paymentDetails?.amount && (
                    <div
                      style={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Text>Amount:</Text>
                      <Text>₹{paymentDetails.amount}</Text>
                    </div>
                  )}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text>Status:</Text>
                    <Text strong style={{ color: "#52c41a" }}>
                      Confirmed
                    </Text>
                  </div>
                </Space>
              </div>

              <Alert
                message={`Payment Confirmation for ${paymentDetails?.name || 'Customer'}`}
                description="Your quick payment has been successfully processed! You will receive an email with the details shortly. Keep the confirmation email for your records."
                type="success"
                showIcon
                style={{ marginBottom: "24px" }}
              />

              <Steps
                current={2}
                size="small"
                style={{ marginBottom: "24px" }}
                items={[
                  {
                    title: "Payment Initiated",
                  },
                  {
                    title: "Processing",
                  },
                  {
                    title: "Completed",
                  },
                ]}
              />
            </>
          )}

          {!paymentStatus?.success && (
            <Alert
              message="We couldn't confirm your payment"
              description={
                <div>
                  <Paragraph>This could be due to:</Paragraph>
                  <ul>
                    <li>Insufficient funds in your account</li>
                    <li>Payment was cancelled during the process</li>
                    <li>Technical issue with the payment gateway</li>
                    <li>Invalid payment details provided</li>
                  </ul>
                  <Paragraph>
                    Please try again or contact our support team for assistance.
                  </Paragraph>
                </div>
              }
              type="warning"
              showIcon
              style={{ marginBottom: "24px" }}
            />
          )}

          <Divider />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            <Button
              icon={<HomeOutlined />}
              size="large"
              onClick={() => navigate("/")}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </Card>

      {paymentStatus?.success && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="link"
            icon={<CreditCardOutlined />}
            onClick={() => window.print()}
          >
            Print Receipt
          </Button>
        </div>
      )}
    </div>
  );
}

export default PaymentSuccess;