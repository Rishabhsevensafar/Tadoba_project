import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Clock, MapPin, Users, Calendar, CreditCard } from "react-feather";
import "../../styles/SafaribookingSuccess.css";

function SafariBookingSuccess() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/bookings/${bookingId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handlePrint = () => {
    window.print();
  };

  const handleHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading your booking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Booking</h3>
        <p>{error}</p>
        <button onClick={handleHome}>Back to Home</button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="error-container">
        <h3>Booking Not Found</h3>
        <p>We couldn't find your booking details.</p>
        <button onClick={handleHome}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="booking-success-container">
      <div className="success-header">
        <CheckCircle size={48} color="#4BB543" />
        <h1>Booking Confirmed!</h1>
        <p className="booking-id">Booking ID: {booking.bookingId || booking._id}</p>
      </div>

      <div className="booking-details-card">
        <h2>Your Safari Details</h2>
        
        <div className="detail-item">
          <Calendar size={20} />
          <span><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</span>
        </div>
        
        <div className="detail-item">
          <Clock size={20} />
          <span><strong>Timing:</strong> {booking.safariTime}</span>
        </div>
        
        <div className="detail-item">
          <MapPin size={20} />
          <span><strong>Zone:</strong> {booking.safariZone}</span>
        </div>
        
        <div className="detail-item">
          <CreditCard size={20} />
          <span><strong>Vehicle:</strong> {booking.vehicleType}</span>
        </div>
        
        <div className="detail-item">
          <Users size={20} />
          <span>
            <strong>Persons:</strong> {booking.adults || 0} Adults, {booking.children || 0} Children
          </span>
        </div>
        
        <div className="total-amount">
          <span>Total Amount Paid:</span>
          <span className="amount">₹{booking.amountPaid || 0}</span>
        </div>
      </div>

      {booking.travelerDetails && booking.travelerDetails.length > 0 && (
        <div className="travelers-list">
          <h3>Traveler Information</h3>
          {booking.travelerDetails.map((traveler, index) => (
            <div key={index} className="traveler-item">
              <p><strong>{index + 1}. {traveler.fullName}</strong></p>
              <p>Age: {traveler.age} | Gender: {traveler.gender}</p>
              <p>ID: {traveler.idType} - {traveler.idNumber}</p>
            </div>
          ))}
        </div>
      )}

      <div className="whats-next">
        <h3>What's Next?</h3>
        <ul>
          <li>You'll receive a confirmation email with your booking details</li>
          <li>Please arrive at least 30 minutes before your scheduled time</li>
          <li>Carry a printed copy or digital version of your booking confirmation</li>
          <li>Don't forget to bring valid ID proofs for all travelers</li>
        </ul>
      </div>

      <div className="action-buttons">
        <button className="print-btn" onClick={handlePrint}>Print Ticket</button>
        <button className="home-btn" onClick={handleHome}>Back to Home</button>
      </div>
    </div>
  );
}

export default SafariBookingSuccess;