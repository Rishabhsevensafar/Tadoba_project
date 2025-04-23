import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ImportantLinks from "../ImportantLinks";
import axios from "axios";
import HotelEnquiry from "../HotelEnquiry";
import { FaStar } from "react-icons/fa";
import { CheckCircleOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/HotelDetails.css";

// const convertToEmbedURL = (url) => {
//   try {
//     if (!url) return "";
//     const urlObj = new URL(url);
//     const searchQuery = urlObj.searchParams.get("q");
//     if (searchQuery) {
//       return `https://www.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`;
//     }
//     return url.replace("/maps", "/maps/embed");
//   } catch {
//     return "";
//   }
// };

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHotelDetails();
  }, []);

  const fetchHotelDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/hotel/hotel-packages/${id}`
      );
      setHotel(res.data);
    } catch (err) {
      console.error("Error loading hotel:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="hotel-loading">Loading...</div>;
  if (!hotel) return <p>Hotel not found.</p>;

  return (
    <>
      <Header />
      <div className="hotel-page-container">
        <div className="hotel-gallery">
          <div className="d-none d-lg-flex gap-2">
            {hotel.images?.slice(0, 3).map((img, i) => (
              <img
                src={`http://localhost:5000${img}`}
                key={i}
                className="hotel-gallery-img"
                alt={`hotel-img-${i}`}
              />
            ))}
          </div>
        </div>

        <section className="hotel-summary">
          <div className="container">
            <h2 className="hotel-title d-flex">
              {hotel.title}{" "}
              {[...Array(hotel.number_of_stars || 3)].map((_, i) => (
                <FaStar key={i} className="star-icon" />
              ))}
            </h2>
            <p className="hotel-location">
              {hotel.location?.name} - {hotel.location?.pincode}
            </p>
            <p className="hotel-description">{hotel.description}</p>
          </div>
        </section>

        <section className="deluxe-section container">
          <h3 className="deluxe-heading mb-4">
            Deluxe Accommodation & Pricing
          </h3>
          <div className="deluxe-box">
            <div className="deluxe-left">
              <h4 className="room-type">{hotel.room_type}</h4>
              <ul className="amenities-list">
                {hotel.amenities?.slice(0, 5).map((amenity, index) => (
                  <li key={index}>
                    <CheckCircleOutlined className="icon" /> {amenity}
                  </li>
                ))}
              </ul>
              <p className="meal-note">
                Includes Breakfast • Welcome Drink • Early Check-in*
              </p>
            </div>

            <div className="deluxe-right">
              <p className="old-price">₹ {hotel.real_price || "N/A"}</p>
              <h4 className="new-price">₹ {hotel.discounted_price || "N/A"}</h4>
              <p className="note">Per Night (All Inclusive)</p>
              <HotelEnquiry hotelId={hotel._id} />
            </div>
          </div>
        </section>

        <section className="hotel-facilities-section">
          <div className="container">
            <h4>Facilities</h4>
            <div className="facility-grid">
              {hotel.facilities?.map((f, i) => (
                <div className="facility-item" key={i}>
                  <CheckCircleOutlined className="facility-check" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hotel-location-section">
          <div className="container">
            <h4>Location</h4>
            <p>
              {hotel.location?.name}, {hotel.location?.pincode}
            </p>
            {hotel.map_location ? (
              <iframe
                src={hotel.map_location}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="hotel-map"
              ></iframe>
            ) : (
              <p>No map available</p>
            )}
          </div>
        </section>
        {/* ✅ Booking Policy Section */}
        <div className="policy-container">
          <h4>Booking Policy</h4>
          <div className="availableRoom mt-3">
            <ul>
              <li>
                As per the government regulations, every guest has mandatory to
                carry a valid Photo ID. The identification proofs can be Aadhaar
                Card, Driving License, Voters Card, Passport and Ration Card.
              </li>
              <li>
                Seven Safar will not be responsible for the check-in denied by
                the hotel due to unavailability of Identification proofs.
              </li>
              <li>
                The Main guest checking-in to the hotel must be minimum of 18
                years old. Children accompanying adults may be between 1 and 12
                years.
              </li>
              <li>
                Guests will be charged for extra bed, food and other facilities
                which are not mentioned in the booking voucher and it may vary
                as per the hotel.
              </li>
              <li>
                If an extra bed is included in your booking, you may be provided
                a folding cot or a mattress (depends on hotel).
              </li>
              <li>
                Check-in/check-out time may vary as per hotel to hotel and can
                be checked on the confirmation voucher. For early check-in or
                late check-out, you are advised to confirm the same directly
                from the respective hotel.
              </li>
              <li>
                The services which are not mentioned in booking voucher such as
                room service, mini bar, snacks or telephone calls, etc. These
                services will be charged by the hotel at the time of check-out.
              </li>
              <li>
                If the hotel denies accommodation to the guests posing as a
                'couple' on not providing appropriate ID proof, GTI Travel will
                not be responsible for this condition and won’t provide any
                refund for such bookings.
              </li>
              <li>
                The hotel reserves all the rights to decline accommodation to
                locals/city/nearby residents. Seven Safar Toor & Travels will
                not be responsible for any check-in declined by the hotel or any
                refunds due to the above-mentioned reason.
              </li>
              <li>
                For any modifications in booking, users have to pay applicable
                cancellation/modification charges. Modified bookings will
                entertain as per subject to availability and may depend on the
                booking policy of the hotel. The cancellation/modification
                charges are standard and any waiver is on the discretion of the
                hotel.
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
                Please check with the hotel directly for more information on the
                same.
              </li>
              <li>
                If payment has been received by UPI/credit/debit card, the
                refund shall be credited to the same card by which the payment
                was received. In other cases, the refund will be made by Account
                Payee Cheque only.
              </li>
              <li>
                Force Majeure events, strikes, fairs, festivals, weather
                conditions, traffic problems, overbooking of hotels, closure
                of/entry restrictions at a place of visit, etc. While we will do
                our best to make suitable alternate arrangements, we would not
                be held liable for any refunds/compensation claims arising out
                of this.
              </li>

              <li>
                In case of dispute, if any, shall be subject to the exclusive
                jurisdiction of the courts in New Delhi.
              </li>
              <li>
                Guests are requested to read the terms & conditions before
                making any booking under the offers running on Seven Safar Toor
                and Travels.
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

      <ImportantLinks />
      <Footer />
    </>
  );
};

export default HotelDetails;
