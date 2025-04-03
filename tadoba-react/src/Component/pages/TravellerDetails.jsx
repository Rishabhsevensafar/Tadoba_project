import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TravellerDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking =
    location.state?.booking ||
    JSON.parse(localStorage.getItem("booking")) ||
    null;

  useEffect(() => {
    if (!booking) {
      console.error("No booking data received! Redirecting...");
      navigate("/");
      return;
    }
  }, [booking, navigate]);

  const bookingId = booking?.bookingId || booking?._id || "";
  if (!bookingId) {
    console.error("Booking ID is undefined! Cannot proceed to payment.");
    alert("Booking ID is missing. Please try again.");
    return;
  }
  const {
    safariZone,
    safariTime,
    date,
    vehicleType,
    adults = 1,
    children = 0,
    amountPaid = 0,
  } = booking;

  // State to manage traveler details
  const [travelerDetails, setTravelerDetails] = useState([]);
  // State to manage terms acceptance
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Generate traveler input fields dynamically
  useEffect(() => {
    let travelers = [];
    for (let i = 0; i < adults; i++) {
      travelers.push({
        fullName: "",
        age: "",
        gender: "Male",
        nationality: "Indian",
        idType: "Aadhar Card",
        idNumber: "",
      });
    }
    for (let i = 0; i < children; i++) {
      travelers.push({
        fullName: "",
        age: "",
        gender: "Male",
        nationality: "Indian",
        idType: "Aadhar Card",
        idNumber: "",
      });
    }
    setTravelerDetails(travelers);
  }, [adults, children]);

  // Handle traveler input change
  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...travelerDetails];
    updatedTravelers[index][field] = value;
    setTravelerDetails(updatedTravelers);
  };

  // Validate traveler details
  const validateTravelerDetails = () => {
    for (const traveler of travelerDetails) {
      if (!traveler.fullName || !traveler.age || !traveler.idNumber) {
        return false;
      }
    }
    return true;
  };

  // Handle Razorpay Payment
  const handlePayment = async () => {
    try {
      // 1. Validate Traveler Details
      if (!validateTravelerDetails()) {
        alert("Please fill in all traveler details");
        return;
      }
      if (!termsAccepted) {
        alert("Please accept the terms and conditions");
        return;
      }

      console.log("Starting payment process with Booking ID:", bookingId);

      // 2. Submit Traveler Details to Backend
      const travelerResponse = await fetch(
        `http://localhost:5000/api/booking/${bookingId}/travelers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ travelers: travelerDetails }),
        }
      );

      const travelerData = await travelerResponse.json();
      if (!travelerResponse.ok) {
        alert(travelerData.error || "Failed to submit traveler details!");
        return;
      }

      console.log("Traveler details submitted successfully.");

      // 3. Create Razorpay Order
      const orderResponse = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amountPaid,
            customerId: bookingId, // Directly use booking._id
            customerName: booking.name,
            customerEmail: booking.email || "customer@example.com",
            customerPhone: booking.phone || "9999999999",
          }),
        }
      );

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        throw new Error("Payment Order Creation Failed");
      }

      console.log("Razorpay Order Created:", orderData);

      // 4. Open Razorpay Checkout
      const options = {
        key: "rzp_test_MFLhROUXtI492b", // Your Razorpay Key
        amount: amountPaid * 100, // Amount in paise
        currency: "INR",
        order_id: orderData.orderId, // Razorpay Order ID
        name: "Safari Booking Payment",
        description: `Booking for ${safariZone} - ${safariTime}`,
        image: "/logo.png", // Your logo
        prefill: {
          name: booking.name,
          email: booking.email || "customer@example.com",
          contact: booking.phone || "9999999999",
        },
        theme: { color: "#F37254" },
        // Inside the Razorpay handler:
        handler: async function (response) {
          try {
            setIsProcessingPayment(true);
            const verifyRes = await fetch(
              "http://localhost:5000/api/payment/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: orderData.orderId,
                  paymentId: response.razorpay_payment_id,
                  signature: response.razorpay_signature,
                }),
              }
            );
        
            const verificationData = await verifyRes.json();
        
            if (verificationData.success) {
              navigate(`/booking-success/${verificationData.bookingId}`, {
                state: { loading: true } // Pass loading state
              });
            } else {
              setIsProcessingPayment(false);
              alert("Payment verification failed!");
            }
          } catch (error) {
            setIsProcessingPayment(false);
            console.error("Payment Error:", error);
            alert("Payment failed. Please contact support.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };
  if (isProcessingPayment) {
    return (
      <div className="payment-processing">
        <div className="loader"></div>
        <h3>Processing your payment...</h3>
        <p>Please wait while we confirm your booking</p>
      </div>
    );
  }
  return (
    <>
      <div className="travellerHeader">
        <h2>Traveller Details</h2>
      </div>

      <div className="container travellerBorder mb-5">
        <div className="safaridatetime mt-3">
          <h6>
            Safari Date: {date ? new Date(date).toLocaleDateString() : "N/A"} |
            Safari Time: {safariTime || "N/A"}
          </h6>
        </div>

        {/* Traveler Input Fields */}
        {travelerDetails.map((traveler, index) => (
          <div className="d-flex justify-content-around mt-2" key={index}>
            <div>
              <p>
                {index + 1}. {index < adults ? "Adult" : "Child"}
              </p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={traveler.fullName}
                onChange={(e) =>
                  handleTravelerChange(index, "fullName", e.target.value)
                }
                required
              />
            </div>
            <div>
              <select
                value={traveler.gender}
                onChange={(e) =>
                  handleTravelerChange(index, "gender", e.target.value)
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <input
                type="number"
                placeholder="Age"
                value={traveler.age}
                onChange={(e) =>
                  handleTravelerChange(index, "age", e.target.value)
                }
                required
              />
            </div>
            <div>
              <select
                value={traveler.nationality}
                onChange={(e) =>
                  handleTravelerChange(index, "nationality", e.target.value)
                }
              >
                <option value="Indian">Indian</option>
                <option value="Foreigner">Foreigner</option>
              </select>
            </div>
            <div>
              <select
                value={traveler.idType}
                onChange={(e) =>
                  handleTravelerChange(index, "idType", e.target.value)
                }
              >
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="Voter Id">Voter Id</option>
                <option value="Passport">Passport</option>
                <option value="Driving Licence">Driving Licence</option>
                <option value="OCI">OCI</option>
                <option value="Other">Any Other Id Card</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="ID Number"
                value={traveler.idNumber}
                onChange={(e) =>
                  handleTravelerChange(index, "idNumber", e.target.value)
                }
                required
              />
            </div>
          </div>
        ))}

        <div className="mx-2 mt-3">
          <p>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />{" "}
            I have read and accept the{" "}
            <Link to="/termandcondition">terms and conditions</Link>
          </p>
        </div>

        <button className="payable mt-2" onClick={handlePayment}>
          Proceed to Payment - ₹{amountPaid}
        </button>
      </div>
      {/* Booking Summary Table */}
      <div className="mt-4">
        <table className="table w-100 table-bordered">
          <thead>
            <tr>
              <th className="bookingtable" colSpan={4}>
                Booking Summary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>Safari Date:</b>
              </td>
              <td>
                {date ? new Date(date).toLocaleDateString() : "Invalid Date"}
              </td>
              <td>
                <b>Safari Type:</b>
              </td>
              <td>{vehicleType || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <b>Safari Timing:</b>
              </td>
              <td>{safariTime || "N/A"}</td>
              <td>
                <b>Safari Zone:</b>
              </td>
              <td>{safariZone || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <b>Adults:</b>
              </td>
              <td>{adults}</td>
              <td>
                <b>Children:</b>
              </td>
              <td>{children}</td>
            </tr>
            <tr>
              <td>
                <b>Total Amount:</b>
              </td>
              <td colSpan={3}>₹{amountPaid || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Declaration */}
      <div>
        <p className="bookingtable">
          <b>Declaration</b>
        </p>
        <p>
          I authorize Safari for using my Mobile Number, Identity Proof & Email
          mentioned in this permit for intimation and verification purposes.
        </p>
        <ul>
          <li>
            All reservations inside the Tadoba National Park are provisional and
            can be changed or cancelled without prior information.
          </li>
          <li>Carrying firearms is not permitted.</li>
          <li>No pets can be taken inside the park.</li>
          <li>Walking or trekking is strictly prohibited.</li>
        </ul>
      </div>
    </>
  );
}

export default TravellerDetails;
