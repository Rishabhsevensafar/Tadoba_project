import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import Header from "../Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios"; // ✅ Import axios for API calls

function HotelDetails() {
  const { id } = useParams(); // ✅ Get hotel ID from URL
  const [hotel, setHotel] = useState(null); // ✅ Store hotel details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHotelDetails();
  }, []);
  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/hotel/hotel-packages/${id}`);
      setHotel(response.data);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>; // ✅ Show loading while fetching data
  if (!hotel) return <p>Hotel not found.</p>; // ✅ Show message if hotel not found

  return (
    <>
      <Header />

      <div className="d-flex">
        {/* ✅ Render Hotel Images */}
        {hotel.images && hotel.images.length > 0 ? (
          hotel.images.slice(0, 3).map((image, index) => (
            <img key={index} src={`http://localhost:5000${image}`} className="tadobadetailImg pe-lg-1" alt="" />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <section className="leaf pt-4">
        <div className="container">
          <div>
            <h2 className="ms-2">
              {hotel.title}{" "}
              {[...Array(hotel.number_of_stars || 3)].map((_, index) => (
                <FaStar key={index} style={{ color: "#FFD43B" }} className="mb-2" />
              ))}
            </h2>
            <p className="ms-2">
              Address: {hotel.location?.name || "Location Not Available"}, {hotel.location?.pincode}
            </p>
          </div>

          <div className="hotelDetailDiscription">
            <div>
              <h4>Description</h4>
              <p>{hotel.description}</p>
            </div>
            <div>
              {hotel.images && hotel.images.slice(0, 2).map((image, index) => (
                <img key={index} src={`http://localhost:5000${image}`} className="imgHotelDetail" alt="" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Available Rooms Section */}
      <section className="pb-5">
        <div className="container">
          <div>
            <h4>Available Rooms</h4>
            <table className="table mt-3">
              <thead className="thead-light">
                <tr className="tableborder">
                  <th>Room Type</th>
                  <th>Meal Plan</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tableborder">
                    <h4 className="m-2 delux">{hotel.room_type}</h4>
                    <ul className="d-flex">
                      <div>
                        {hotel.amenities && hotel.amenities.slice(0, 3).map((amenity, index) => (
                          <li key={index}>{amenity}</li>
                        ))}
                        <Popup
                          className="policy mt-3"
                          trigger={<button className="popupbutton1">More Detail</button>}
                          position="right center"
                        >
                          <div className="popupBox1">
                            <h4>{hotel.room_type}</h4>
                            <hr />
                            <h6>Room Amenities</h6>
                            <hr />
                            <ul>
                              {hotel.amenities?.map((amenity, index) => (
                                <li key={index}>{amenity}</li>
                              ))}
                            </ul>
                          </div>
                        </Popup>
                      </div>
                    </ul>
                  </td>
                  <td className="tableborder">
                    <h6>Accomodation with Free Breakfast</h6>
                    <ul>
                      <li>Welcome drink on arrival</li>
                      <li>Early check-in, subject to availability</li>
                    </ul>
                  </td>
                  <td className="tableborder">
                    <div className="ps-5 ms-auto">
                      <s>&#x20B9; {hotel.real_price || "N/A"}</s>
                      <h4> &#x20B9; {hotel.discounted_price || "N/A"}</h4>
                      <p>+ &#x20B9; 0 taxes & fees per night</p>
                      <Link to="/reviewbookinghotel">
                        <button type="button" className="btn btn-success">Book Now</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ✅ Facilities Section */}
          <h4>Facilities</h4>
          <div className="availableRoom mt-3">
            <div className="facilities">
              <ul>
                {hotel.facilities && hotel.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ Location Section */}
          <div>
            <h4>Location</h4>
            <div className="availableRoom mt-3">
              <p>Address: {hotel.location?.name}, {hotel.location?.pincode}</p>
              <iframe src={hotel.map_location} allowFullScreen loading="lazy"></iframe>
            </div>
          </div>

          {/* ✅ Booking Policy Section */}
          <div>
            <h4>Booking Policy</h4>
            <div className="availableRoom mt-3">
              <ul>
                <li>As per government regulations, every guest must carry a valid Photo ID.</li>
                <li>Early check-in is subject to availability.</li>
                <li>Check-in/check-out time may vary as per the hotel.</li>
                <li>Extra services not mentioned in booking voucher will be charged by the hotel.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ImportantLinks />
      <Footer />
    </>
  );
}

export default HotelDetails;
