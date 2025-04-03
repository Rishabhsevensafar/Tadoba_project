import { useParams } from "react-router-dom";

function BookingSuccess() {
  const { bookingId } = useParams();

  return (
    <div className="booking-confirmation">
      <h1>🎉 Booking Successful!</h1>
      <p>Your Booking ID: <strong>{bookingId}</strong></p>
      <p>We've sent the details to your email.</p>
      <button onClick={() => window.print()}>Print Booking</button>
    </div>
  );
}

export default BookingSuccess;