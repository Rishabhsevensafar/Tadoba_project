import React from "react";
import ImportantLinks from "../ImportantLinks";
import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import tadobaHotel from "../../assets/images/tadoba1.jpeg";
import tadobaHotel2 from "../../assets/images/tadoba2.jpeg";
import hotelTadobaDetail from "../../assets/images/hotel-tadoba-detail.jpeg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { useEffect } from "react";
import "reactjs-popup/dist/index.css";
function HotelDetails() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header></Header>
      {/* <div className="row hotelback">
        <div className="col-sm-12 col-md-3 col-lg-3 px-3 ">
          <div className="boxx">
            <select>
              <option value="">Select</option>
              <option value="">Tiger valley resort Tdaoba</option>
              <option value="">Tiger valley resort Tdaoba</option>
              <option value="">Tiger valley resort Tdaoba</option>
            </select>
            <p>All Hotels in tadoba</p>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3 px-3">
          <div className="boxx">
            <div className="dateFormat">
              <DatePicker
                className="date1"
                placeholderText="Check In"
                selectsStart
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate}
              />
              <DatePicker
                className="date1"
                placeholderText="Check Out"
                selectsEnd
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                endDate={endDate}
                startDate={startDate}
                minDate={startDate}
              />
            </div>
            <p>Choose Date</p>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3 px-3">
          <div className="boxx">
            <select>
              <option value="">Select</option>
              <option value="">Tiger valley resort Tdaoba</option>
              <option value="">Tiger valley resort Tdaoba</option>
              <option value="">Tiger valley resort Tdaoba</option>
            </select>
            <p>All Hotels in tadoba</p>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-lg-3 px-3">
          <div className="boxxSearch">
            <p>Search</p>
          </div>
        </div>{" "}
      </div> */}

      <div className="d-flex">
        <img src={tadobaHotel} className="tadobadetailImg m1 pe-lg-1" alt="" />
        <img src={tadobaHotel2} className="tadobadetailImg pe-lg-1" alt="" />
        <img src={tadobaHotel} className="tadobadetailImg " alt="" />
      </div>
      <section className="leaf pt-4">
        <div className="container">
          <div>
            <h2 className="ms-2">
              Tiger Valley Resort, Tadoba{" "}
              <FaStar style={{ color: "#FFD43B" }} className="mb-2" />
              <FaStar style={{ color: "#FFD43B" }} className="mb-2" />
              <FaStar style={{ color: "#FFD43B" }} className="mb-2" />
            </h2>
            <p className="ms-2">
              Address: Tadoba National Park, Moharli Gate, Maharashtra 442404
            </p>
          </div>
          <div className="hotelDetailDiscription">
            <div>
              <h4>Description</h4>
              <p>
                Tiger Valley Resort in Tadoba National Park is a premium
                accommodation option designed to offer guests an immersive
                wildlife experience. Located near the heart of the park, this
                resort provides easy access to the rich biodiversity and
                picturesque landscapes of Tadoba. The resort features
                well-appointed cottages and tents, blending modern comforts with
                a rustic charm. Each unit is thoughtfully designed to ensure a
                cosy stay, equipped with amenities like air conditioning,
                en-suite bathrooms, and private verandas. Guests can enjoy
                delicious meals at the on-site restaurant which offers a variety
                of local and international dishes. One of the highlights of
                Tiger Valley Resort is its proximity to the park’s key wildlife
                zones, making it an ideal base for safari adventures. The resort
                organizes guided jeep safaris, allowing visitors to explore
                Tadoba’s dense forests and encounter its famous residents,
                including tigers, leopards, and a range of bird species. The
                property also emphasizes sustainability and conservation, with
                efforts to minimize its environmental impact while enhancing the
                guest experience. Overall, Tiger Valley Resort is a top choice
                for travellers seeking a comfortable and memorable stay in the
                heart of Tadoba National Park.
              </p>
            </div>
            <div>
              <img src={tadobaHotel} className="imgHotelDetail" alt="" />
              <img src={tadobaHotel2} className="imgHotelDetail" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="container">
          <div>
            <h4>Available Rooms</h4>
            <table className="table mt-3">
              <thead className="thead-light">
                <tr className="tableborder">
                  <th scope="col tableborder">Room Type</th>
                  <th scope="col tableborder">Meal Plan</th>
                  <th scope="col tableborder">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tableborder">
                    <img
                      src={hotelTadobaDetail}
                      className="hotelTadobaDetail mt-2"
                      alt=""
                    />
                    <h4 className="m-2 delux">Super Delux</h4>
                    <ul className="d-flex">
                      <div>
                        <li>Wake-up call</li>
                        <li>Flat Tv</li>
                        <li>Internet-wifi</li>

                        <Popup
                          className="policy mt-3 "
                          trigger={
                            <button className="popupbutton1">
                              More Detail
                            </button>
                          }
                          position="right center"
                        >
                          <div className="popupBox1">
                            <h4>Super Delux</h4>
                            <hr />
                            <h6>Room Amenities</h6>
                            <hr />
                            <ul>
                              <li>Wake-up call</li>
                              <li>Internet – Wifi</li>
                              <li> Breakfast, lunch & dinner included</li>
                              <li>Flat Tv</li>
                              <li> Coffee and tea</li>
                            </ul>
                          </div>
                        </Popup>
                      </div>
                      <div>
                        <span className="checkinout">Check-In:</span> 12:00 PM
                        <p>
                          <span className="checkinout">Check-Out:</span> 12:00
                          PM
                        </p>
                      </div>
                    </ul>
                  </td>
                  <td className="tableborder mt-2">
                    <input type="radio" className="mt-2" /> Room Only <br />
                    <input type="radio" /> Free Breakfast <br />
                    <input type="radio" /> Breakfast & Lunch/Dinner <br />
                    <input type="radio" /> Breakfast, Lunch & Dinner
                    <h6 className="mt-4">Accomodation with Free Breakfast</h6>
                    <ul>
                      <li>Welcome drink on arrival</li>
                      <li>Early check-in, subject to availability</li>
                    </ul>
                    <Popup
                      className="policy mt-3 "
                      trigger={
                        <button className="popupbutton">
                          {" "}
                          Cancellation Policy
                        </button>
                      }
                      position="right center"
                    >
                      <div className="popupBox">
                        <h4>Cancellation Policy</h4>
                        <hr />
                        <p>
                          Free Cancellation(100% refund) if you cancel this
                          booking before 5 days
                        </p>
                        <hr />
                        <h6>
                          Cancellations post that will be subject to a fee as
                          follows
                        </h6>
                        <hr />
                        <table className="border">
                          <th>
                            <td> </td>
                            <td colspan="2">FEE</td>
                          </th>
                          <tr scope="row">
                            {" "}
                            <td
                              className="border"
                              style={{ width: "200px", height: "40px" }}
                            >
                              Before 5 days
                            </td>
                            <td className="border" style={{ width: "250px" }}>
                              0.0% of booking amount
                            </td>
                          </tr>
                          <tr scope="row">
                            {" "}
                            <td
                              className="border"
                              style={{ width: "200px", height: "40px" }}
                            >
                              After Booking
                            </td>
                            <td
                              className="border"
                              style={{ width: "200px", height: "40px" }}
                            >
                              100.0% of booking amount
                            </td>
                          </tr>
                          <tr scope="row">
                            {" "}
                            <td
                              className="border"
                              style={{ width: "200px", height: "40px" }}
                            >
                              Before 2 days
                            </td>
                            <td
                              className="border"
                              style={{ width: "200px", height: "40px" }}
                            >
                              50% of booking amount
                            </td>
                          </tr>
                        </table>
                        <ul>
                          <li className="mt-2">
                            Cancellations are only allowed before the Check-In
                            Time. All time mentioned above is in Destination
                            Time.
                          </li>
                          <li className="mt-2">
                            Complimentary Breakfast is available.
                          </li>
                        </ul>
                      </div>
                    </Popup>
                  </td>
                  <td className="tableborder">
                    <div className="ps-5 ms-auto">
                      <p className="mt-2">
                        <span>Promo Code Applied 3: Todobadis (₹306) </span>
                      </p>
                      <s>&#x20B9; 7650</s>
                      <h4> &#x20B9; 6579</h4>
                      <p>
                        + &#x20B9; 0 taxes & fees <br />
                        per night
                      </p>
                      <Link to="/reviewbookinghotel">
                        {" "}
                        <button type="button" className="btn btn-success">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h4>Facilities</h4>
          <div className="availableRoom mt-3">
            <div className="facilities">
              <ul>
                <li> Restaurant</li>
                <li className="mt-1"> Room Service on Request</li>
                <li className="mt-1"> House Keeping</li>
                <li className="mt-1"> Refrigerator</li>
                <li className="mt-1"> Indoor Games</li>
                <li className="mt-1"> Jungle Safari</li>
                <li className="mt-1"> Free Parking</li>
                <li className="mt-1"> Air Conditioning</li>
              </ul>
              <ul className="list-group">
                <li className="mt-1"> Dinning Area</li>
                <li className="mt-1"> Lawn</li>
                <li className="mt-1"> CCTV</li>
                <li className="mt-1"> Fire Extinguishers</li>
                <li className="mt-1"> First Aid Services</li>
                <li className="mt-1"> Wake Up Call</li>
                <li className="mt-1"> Reception (Front Desk)</li>
                <li className="mt-1"> Security Guard</li>
              </ul>
              <ul className="list-group">
                <li className="mt-1"> Restaurant</li>
                <li className="mt-1"> Room Service on Request</li>
                <li className="mt-1"> House Keeping</li>
                <li className="mt-1"> Refrigerator</li>
                <li className="mt-1"> Indoor Games</li>
                <li className="mt-1"> Jungle Safari</li>
                <li className="mt-1"> Free Parking</li>
                <li className="mt-1"> Air Conditioning</li>
              </ul>
            </div>
          </div>
          <div>
            <h4>Location</h4>
            <div className="availableRoom mt-3">
              <p>
                {" "}
                Address: Tadoba National Park, Moharli Gate, Maharashtra 442404
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119761.46955152467!2d79.30514183235007!3d20.277658278629513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2ccd16b6538703%3A0x418b2e1575b004d1!2sTadoba-Andhari%20Tiger%20Reserve!5e0!3m2!1sen!2sin!4v1737453014317!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

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
