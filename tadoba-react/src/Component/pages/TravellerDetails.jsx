import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TravellerDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking || null;

  // Redirect if no booking data
  useEffect(() => {
    if (!booking) {
      console.error("No booking data received! Redirecting...");
      navigate("/");
      return;
    }
  }, [booking, navigate]);

  // Extract booking details
  const bookingId = booking?.bookingId || booking?._id;
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

  // Handle submit traveler details
  const submitTravelerDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/booking/${bookingId}/travelers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ travelers: travelerDetails }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Traveler details added successfully!");
        navigate("/payment", { state: { booking } });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error submitting traveler details:", error);
    }
  };
  // Handle Razorpay Payment
  const handlePayment = async () => {
    try {
      console.log("Starting payment process...");
  
      // Step 1: Submit Traveler Details First
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
        return; // Stop if traveler details submission fails
      }
  
      console.log("Traveler details submitted successfully.");
  
      // Step 2: Now, Request Payment Order
      const response = await fetch("http://localhost:5000/api/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountPaid, receipt: `receipt_${bookingId}` }),
      });
  
      const data = await response.json();
      if (!data.success) throw new Error("Payment Order Creation Failed");
  
      console.log("Payment Order Created:", data);
  
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Ensure this is correct
        amount: data.amount,
        currency: data.currency,
        name: "Tadoba Wildlife Safari",
        description: "Safari Booking Payment",
        order_id: data.orderId,
        handler: async function (response) {
          console.log("Payment Success Response:", response);
  
          const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
  
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment Successful!");
            navigate("/booking-confirmation", { state: { booking, payment: response } });
          } else {
            alert("Payment Verification Failed!");
          }
        },
        theme: { color: "#228B22" },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };  
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
              />
            </div>
          </div>
        ))}

        <div className="mx-2 mt-3">
          <p>
            <input type="checkbox" /> I have read and accept the{" "}
            <Link to="/termandcondition">terms and conditions</Link>
          </p>
        </div>

        <button className="payable mt-2" onClick={handlePayment}>
          Proceed to Payment - ₹{amountPaid}
        </button>

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
            I authorize Safari for using my Mobile Number, Identity Proof &
            Email mentioned in this permit for intimation and verification
            purposes.
          </p>
          <ul>
            <li>
              All reservations inside the Tadoba National Park are provisional
              and can be changed or cancelled without prior information.
            </li>
            <li>Carrying firearms is not permitted.</li>
            <li>No pets can be taken inside the park.</li>
            <li>Walking or trekking is strictly prohibited.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TravellerDetails;
