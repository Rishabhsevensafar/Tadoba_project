import React from "react";
import ImportantLinks from "../ImportantLinks";
import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import tadobaHotel from "../../assets/images/tadoba1.jpeg";
import tadobaHotel2 from "../../assets/images/tadoba2.jpeg";
import hotelTadobaDetail from "../../assets/images/hotel-tadoba-detail.jpeg";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { useEffect } from "react";
import "reactjs-popup/dist/index.css";
import { CheckCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import HotelEnquiry from "../HotelEnquiry";
const convertToEmbedURL = (url) => {
  if (!url) return "";

  // Already an embed URL, return as is
  if (url.includes("embed")) return url;

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    if (url.includes("/maps/place/")) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d${urlObj.searchParams.get(
        "q"
      )}`;
    } else if (url.includes("/maps/dir/")) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d${urlObj.searchParams.get(
        "dir"
      )}`;
    }
  } catch (error) {
    console.error("Invalid Google Maps URL:", error);
    return "";
  }

  return url; // Return original if can't parse
};
function HotelDetails() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { id } = useParams(); // ✅ Get hotel ID from URL
  const [hotel, setHotel] = useState(null); // ✅ Store hotel details
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHotelDetails();
  }, []);
  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hotel/hotel-packages/${id}`
      );
      setHotel(response.data);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  if (!hotel) return <p>Hotel not found.</p>; // ✅ Show message if hotel not found

  return (
    <>
      <Header></Header>
      <div className="d-flex">
        {/* ✅ Render Hotel Images */}
        {hotel.images && hotel.images.length > 0 ? (
          hotel.images
            .slice(0, 3)
            .map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000${image}`}
                className="tadobadetailImg pe-lg-1"
                alt=""
              />
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
                <FaStar
                  key={index}
                  style={{ color: "#FFD43B" }}
                  className="mb-2"
                />
              ))}
            </h2>
            <p className="ms-2">
              Address: {hotel.location?.name || "Location Not Available"},{" "}
              {hotel.location?.pincode}
            </p>
          </div>

          <div className="hotelDetailDiscription">
            <div>
              <h4>Description</h4>
              <p>{hotel.description}</p>
            </div>
            <div>
              {hotel.images &&
                hotel.images
                  .slice(0, 2)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${image}`}
                      className="imgHotelDetail"
                      alt=""
                    />
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
                        {hotel.amenities &&
                          hotel.amenities
                            .slice(0, 3)
                            .map((amenity, index) => (
                              <li key={index}>{amenity}</li>
                            ))}
                        <Popup
                          className="policy mt-3"
                          trigger={
                            <button className="popupbutton1">
                              More Detail
                            </button>
                          }
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
    
    {/* ✅ Book Now Button */}
    <Link to="/reviewbookinghotel">
      <button type="button" className="btn btn-success">
        Book Now
      </button>
    </Link>

    {/* ✅ Enquiry Popup Component */}
    <div style={{ marginTop: "10px" }}>
      <HotelEnquiry hotelId={hotel._id} />
    </div>
  </div>
</td>

                </tr>
              </tbody>
            </table>
          </div>

          <h4>Facilities</h4>
          <div className="availableRoom mt-3">
            <div className="facilities">
              {hotel.facilities && hotel.facilities.length > 0 ? (
                <div className="facility-container">
                  {hotel.facilities
                    .reduce((acc, curr, index) => {
                      const rowIndex = Math.floor(index / 5); // Group into rows of 5
                      if (!acc[rowIndex]) acc[rowIndex] = [];
                      acc[rowIndex].push(curr);
                      return acc;
                    }, [])
                    .map((row, rowIndex) => (
                      <div key={rowIndex} className="facility-row">
                        {row.map((facility, index) => (
                          <span key={index} className="facility-item">
                            <CheckCircleOutlined
                              style={{ color: "#28a745", marginRight: "5px" }}
                            />
                            {facility}
                          </span>
                        ))}
                      </div>
                    ))}
                </div>
              ) : (
                <p>No facilities available.</p>
              )}
            </div>
          </div>

          {/* ✅ Location Section */}
          <div>
            <h4>Location</h4>
            <div className="availableRoom mt-3">
              <p>
                Address: {hotel.location?.name}, {hotel.location?.pincode}
              </p>
              {hotel.map_location ? (
                <iframe
                  src={convertToEmbedURL(hotel.map_location)}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <p className="text-gray-500">No map location available.</p>
              )}
            </div>
          </div>

          {/* ✅ Booking Policy Section */}
          <div>
            <h4>Booking Policy</h4>
            <div className="availableRoom mt-3">
              <ul>
                <li>
                  As per the government regulations, every guest has mandatory
                  to carry a valid Photo ID. The identification proofs can be
                  Aadhaar Card, Driving License, Voters Card, Passport and
                  Ration Card.
                </li>
                <li>
                  Seven Safar will not be responsible for the check-in denied by
                  the hotel due to unavailability of Identification proofs.
                </li>
                <li>
                  The Main guest checking-in to the hotel must be minimum of 18
                  years old. Children accompanying adults may be between 1 and
                  12 years.
                </li>
                <li>
                  Guests will be charged for extra bed, food and other
                  facilities which are not mentioned in the booking voucher and
                  it may vary as per the hotel.
                </li>
                <li>
                  If an extra bed is included in your booking, you may be
                  provided a folding cot or a mattress (depends on hotel).
                </li>
                <li>
                  Check-in/check-out time may vary as per hotel to hotel and can
                  be checked on the confirmation voucher. For early check-in or
                  late check-out, you are advised to confirm the same directly
                  from the respective hotel.
                </li>
                <li>
                  The services which are not mentioned in booking voucher such
                  as room service, mini bar, snacks or telephone calls, etc.
                  These services will be charged by the hotel at the time of
                  check-out.
                </li>
                <li>
                  If the hotel denies accommodation to the guests posing as a
                  'couple' on not providing appropriate ID proof, GTI Travel
                  will not be responsible for this condition and won’t provide
                  any refund for such bookings.
                </li>
                <li>
                  The hotel reserves all the rights to decline accommodation to
                  locals/city/nearby residents. Seven Safar Toor & Travels will
                  not be responsible for any check-in declined by the hotel or
                  any refunds due to the above-mentioned reason.
                </li>
                <li>
                  For any modifications in booking, users have to pay applicable
                  cancellation/modification charges. Modified bookings will
                  entertain as per subject to availability and may depend on the
                  booking policy of the hotel. The cancellation/modification
                  charges are standard and any waiver is on the discretion of
                  the hotel.
                </li>
                <li>
                  reserves the right, at any time, without prior notice and
                  liability and without assigning any reason whatsoever, to
                  add/alter/modify/change or vary all of these terms and
                  conditions or to replace, wholly or in part, this offer by
                  another offer, whether similar to this offer or not, or to
                  extend or withdraw it altogether.
                </li>
                <li>
                  On the Special Occasion such as Long weekend, Holi, Gandhi
                  Jayanti, New Year dates etc. Gala dinner charges which are
                  applicable would be extra and payable directly to the hotel.
                  Please check with the hotel directly for more information on
                  the same.
                </li>
                <li>
                  If payment has been received by UPI/credit/debit card, the
                  refund shall be credited to the same card by which the payment
                  was received. In other cases, the refund will be made by
                  Account Payee Cheque only.
                </li>
                <li>
                  Force Majeure events, strikes, fairs, festivals, weather
                  conditions, traffic problems, overbooking of hotels, closure
                  of/entry restrictions at a place of visit, etc. While we will
                  do our best to make suitable alternate arrangements, we would
                  not be held liable for any refunds/compensation claims arising
                  out of this.
                </li>

                <li>
                  In case of dispute, if any, shall be subject to the exclusive
                  jurisdiction of the courts in New Delhi.
                </li>
                <li>
                  Guests are requested to read the terms & conditions before
                  making any booking under the offers running on Seven Safar
                  Toor and Travels.
                </li>
                <li>
                  All the information pertaining to the hotel including the
                  category of the hotel, images, room type, amenities and
                  facilities available at the hotel are as per the information
                  provided by the hotel to Seven Safar Toor and Travels. This
                  information is for reference only. Any discrepancy that may
                  exist between the website pictures and actual settings of the
                  hotel shall be raised by the User with the hotel directly, and
                  shall be resolved between the User and hotel. Seven Safar Toor
                  and Travels will have no responsibility in that process of
                  resolution, and shall not take any liability for such
                  discrepancies.
                </li>
                <li>For any query or clarification, please write to us at</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default HotelDetails;
