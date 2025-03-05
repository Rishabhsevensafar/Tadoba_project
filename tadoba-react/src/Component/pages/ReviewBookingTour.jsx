  import React, { useState, useEffect } from "react";
  import Header from "../Header";
  import ImportantLinks from "../ImportantLinks";
  import Footer from "../Footer";
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
  import { useParams, useLocation } from "react-router-dom";
  import axios from "axios";
  import bookingBanner from "../../assets/images/paymentImage.png";

  const ReviewBookingTour = () => {
    const { id } = useParams();
    const location = useLocation();
    const [selectedHotel, setSelectedHotel] = useState(null);

    const [packageDetails, setPackageDetails] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [numPersons, setNumPersons] = useState(1);
    const [numRooms, setNumRooms] = useState(1);
    const [travelers, setTravelers] = useState([]);
    const [paymentOption, setPaymentOption] = useState("full");
    const [endDate, setEndDate] = useState(null)

    useEffect(() => {
      fetchPackageDetails();
      if (location.state?.hotel) {
        setSelectedHotel(location.state.hotel);
      } else {
        console.error("No hotel selected!");
      }
    }, [location.state]);

    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tourpackage/${id}`);
        setPackageDetails(response.data.package);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    useEffect(() => {
      const roomsNeeded = Math.ceil(numPersons / 2);
      setNumRooms(roomsNeeded);
      setTravelers((prevTravelers) =>
        Array.from({ length: numPersons }, (_, i) =>
          prevTravelers[i] || { name: "", phone: "", idProof: "", email: "", address: "" }
        )
      );
    }, [numPersons]);
    useEffect(() => {
      if (startDate && packageDetails?.duration) {
        const nights = parseInt(packageDetails.duration.split(" ")[0], 10); // Extract nights
        if (!isNaN(nights)) {
          let checkout = new Date(startDate);
          checkout.setDate(startDate.getDate() + nights);
          setEndDate(checkout);
        }
      }
    }, [startDate, packageDetails]);
    

    // Calculate total price based on hotel price & number of rooms
    const hotelPrice = selectedHotel?.discounted_price || 0;
    const totalPrice = hotelPrice * numRooms;
    const advancePrice = totalPrice / 2;

    if (!packageDetails) return <p className="text-center">Loading package details...</p>;

    return (
      <>
        <Header />
        <div className="booking leaf">
          <img src={bookingBanner} className="bookingImgBanner" alt="Booking Banner" />
          <div className="container">
            <div className="tourBooking">
              <h2>Review and Book</h2>

              <hr />
              <h3>{packageDetails.title} - {packageDetails.duration}</h3>
              <p>Location: {packageDetails.location}</p>

              <h4>Selected Hotel</h4>
              {selectedHotel ? (
                <div className="hotel-info">
                  <p><strong>{selectedHotel.title}</strong></p>
                  <p>Room Type: {selectedHotel.room_type}</p>
                  <p>Price per Room: ₹{hotelPrice.toFixed(2)}</p>
                </div>
              ) : (
                <p className="text-danger">No hotel selected!</p>
              )}

              <div className="row checkInRow">
                <div className="col-md-6">
                  <p>Check In</p>
                  <DatePicker selected={startDate} onChange={setStartDate} className="inputField" />
                </div>
                <div className="col-md-6">
                  <p>Number of Rooms: {numRooms}</p>
                </div>
                <div className="col-md-6">
  <p>Check Out</p>
  <DatePicker 
    selected={endDate} 
    className="inputField" 
    disabled 
    placeholderText="Auto-calculated"
  />
</div>

              </div>

              <h4>Number of Persons</h4>
              <select className="inputField" value={numPersons} onChange={(e) => setNumPersons(Number(e.target.value))}>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>

              <h4>Traveler’s Details</h4>
              <hr />

              {/* First Traveler (Full Details) */}
              <h5>Lead Traveler (Booking Owner)</h5>
              <div className="row">
                <div className="col-md-4">
                  <input type="text" className="inputField" placeholder="Full Name" value={travelers[0]?.name}
                    onChange={(e) => setTravelers((prev) => {
                      const updated = [...prev];
                      updated[0].name = e.target.value;
                      return updated;
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <input type="email" className="inputField" placeholder="Email" value={travelers[0]?.email}
                    onChange={(e) => setTravelers((prev) => {
                      const updated = [...prev];
                      updated[0].email = e.target.value;
                      return updated;
                    })}
                  />
                </div>
                <div className="col-md-4">
                  <input type="text" className="inputField" placeholder="Phone" value={travelers[0]?.phone}
                    onChange={(e) => setTravelers((prev) => {
                      const updated = [...prev];
                      updated[0].phone = e.target.value;
                      return updated;
                    })}
                  />
                </div>
                <div className="col-md-6">
                  <input type="text" className="inputField" placeholder="Address" value={travelers[0]?.address}
                    onChange={(e) => setTravelers((prev) => {
                      const updated = [...prev];
                      updated[0].address = e.target.value;
                      return updated;
                    })}
                  />
                </div>
                <div className="col-md-6">
                  <input type="text" className="inputField" placeholder="ID Proof" value={travelers[0]?.idProof}
                    onChange={(e) => setTravelers((prev) => {
                      const updated = [...prev];
                      updated[0].idProof = e.target.value;
                      return updated;
                    })}
                  />
                </div>
              </div>

              {/* Other Travelers */}
              <h5 className="mt-4">Other Travelers</h5>
              {travelers.slice(1).map((traveler, index) => (
                <div className="row mt-2" key={index + 1}>
                  <div className="col-md-4">
                    <input type="text" className="inputField" placeholder="Full Name" value={traveler.name}
                      onChange={(e) => setTravelers((prev) => {
                        const updated = [...prev];
                        updated[index + 1].name = e.target.value;
                        return updated;
                      })}
                    />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="inputField" placeholder="Phone" value={traveler.phone}
                      onChange={(e) => setTravelers((prev) => {
                        const updated = [...prev];
                        updated[index + 1].phone = e.target.value;
                        return updated;
                      })}
                    />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="inputField" placeholder="ID Proof" value={traveler.idProof}
                      onChange={(e) => setTravelers((prev) => {
                        const updated = [...prev];
                        updated[index + 1].idProof = e.target.value;
                        return updated;
                      })}
                    />
                  </div>
                </div>
              ))}

              {/* Payment Options */}
              <h4>Payment Options</h4>
              <hr />
              <div>
                <label>
                  <input type="radio" value="50" checked={paymentOption === "50"} onChange={() => setPaymentOption("50")} />
                  Pay 50% Advance: ₹{advancePrice.toFixed(2)}
                </label>
                <br />
                <label>
                  <input type="radio" value="full" checked={paymentOption === "full"} onChange={() => setPaymentOption("full")} />
                  Pay Full Amount: ₹{totalPrice.toFixed(2)}
                </label>
              </div>

              <button type="button" className="btn btn-primary mt-4">
                Continue To Payment
              </button>
            </div>
          </div>
        </div>
        <ImportantLinks />
        <Footer />
      </>
    );
  };

  export default ReviewBookingTour;
