import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tadobaHotel from "../../assets/images/tadoba1.jpeg";
import day1package from "../../assets/images/navegaon.jpg";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";
import { CiBeaker1 } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import day2package from "../../assets/images/morpen1.jpg";
function TourPackageDetail() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(()=>{
            window.scrollTo(0, 0);
          },[])
  return (
    <>
      <Header></Header>
      <div className="row hotelback ">
                <div className="col-sm-12 col-md-3 col-lg-3 px-2">
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
                <div className="col-sm-12 col-md-3 col-lg-3 px-2">
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
                <div className="col-sm-12 col-md-2 col-lg-2 px-2">
                  <div className="boxx">
                    <select>
                      <option value="">Select</option>
                      <option value="">Tiger valley resort Tadoba</option>
                      <option value="">Tiger valley resort Tadoba</option>
                      <option value="">Tiger valley resort Tadoba</option>
                    </select>
                    <p>All Hotels in tadoba</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-2 col-lg-2 px-2">
                  <div className="boxx ">
                    <select>
                      <option value="">Select</option>
                      <option value="">Indian</option>
                      <option value="">Foreigner</option>
                    </select>
                    <p>All Hotels in tadoba</p>
                  </div>
                </div>{" "}
                <div className="col-sm-12 col-md-2 col-lg-2  px-2">
                  <button className="boxxSearch">
                    Search
                  </button>
                </div>{" "}
              </div>

      <div className="container">
        <section>
          <h2>Tadoba Weekend Tour - 1 Night and 2 Days</h2>
          <p>
            Lush green Tadoba is no less than heaven on earth. The real
            highlight of Tadoba National Park exists in its varied wildlife. The
            immensely grown popularity for the park lies in its unfailing
            attempt to spot tigers. The livelihood of this paradise should not
            only be explored but living every bit of its genuinely priceless
            experience.
          </p>
          <p>
            All you can cover only in 1N/2D Tadoba Trip itinerary. We have
            prepared a very short itinerary for you to experience the best
            wildlife.
          </p>
        </section>
        <section>
          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-3">
              <h5 className="ps-3">FILTER BY</h5>

              <div className="filterBar ps-3 ">
                <h6>Filter price</h6>
                <hr />
                <div>
                  <h6>Hotel Star</h6>
                  <p>
                    {" "}
                    <input type="checkbox" />
                    <FaStar
                      className="mb-1 ms-1 "
                      style={{ color: "#FFD43B" }}
                    />{" "}
                    <FaStar
                      className="mb-1 ms-1 "
                      style={{ color: "#FFD43B" }}
                    />
                    <FaStar
                      className="mb-1 ms-1 "
                      style={{ color: "#FFD43B" }}
                    />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1"
                    />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1"
                    />
                    <br />
                  </p>
                  <p>
                    {" "}
                    <input type="checkbox" />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1"
                    />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <br />
                  </p>
                  <p>
                    {" "}
                    <input type="checkbox" />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <br />
                  </p>
                  <p>
                    <input type="checkbox" />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <br />
                  </p>
                  <p>
                    {" "}
                    <input type="checkbox" />
                    <FaStar
                      style={{ color: "#FFD43B" }}
                      className="mb-1 ms-1 "
                    />
                    <br />
                  </p>
                </div>
                <hr />
                <div>
                  <h6>Facilities</h6>
                  <div>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Swimming Pool
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Power Backup
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Restaurant
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Room Service on Request
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      House Keeping
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Refrigerator
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Indoor Games
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Kids Play Area
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Jungle Safari
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Free Parking
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Air Conditioning
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Bonfire
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Dinning Area
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      CCTV
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Fire Extinguishers
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Jacuzzi
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      First Aid Services
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Activity Centre
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Pool Towels
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Wake Up Call
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Outdoor Sports
                    </p>
                    
                  </div>
                </div>
                <hr />

                <div>
                  <h6>Location</h6>
                  <div>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Chandrapur
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Nagpur
                    </p>
                    <p>
                      <input type="checkbox" className="me-2" />
                      Chimur
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-9 col-lg-9 ">
              <p>5 Packages With Hotel Found</p>
              <div className="hotelTourPackages">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel image"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    Tiger Valley Resort, Tadoba
                    <FaStar className="" style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />{" "}
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Tadoba National Park, Moharli Gate,
                   Maharashtra 442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <CiBeaker1 /> Facilities: Restaurent, Room Service on
                    Request, House
                  </p>
                  <p className="">
                    <MdOutlineWatchLater /> 1 Night/2 Days <FaCarAlt /> 1 Jeep
                    <FaCarAlt /> Safari Deluxe Room
                  </p>
                </div>

                <div className="ps-5 ms-auto text-end tourhotside">
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 21094</s>
                  <h4> &#x20B9; 13444</h4>
                  <p>
                    + &#x20B9; 0 taxes & fees 
                    per night
                  </p>
                  <Link to="/booking"> <button type="button" className="btn btn-dark">
                    Book Now
                  </button></Link>
                </div>
              </div>

              <div className="hotelTourPackages mt-3">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    Tiger Valley Resort, Tadoba
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />{" "}
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Tadoba National Park, Moharli Gate,
                     Maharashtra 442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <CiBeaker1 /> Facilities: Restaurent, Room Service on
                    Request, House
                  </p>
                  <p className="pb-4">
                    <MdOutlineWatchLater /> 1 Night/2 Days <FaCarAlt /> 1 Jeep
                    Safari Deluxe Room
                  </p>
                </div>

                <div className="ps-5 ms-auto text-end tourhotside">
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 21094</s>
                  <h4> &#x20B9; 13444</h4>
                  <p>
                    + &#x20B9; 0 taxes & fees 
                    per night
                  </p>
                    <Link to="/booking"> <button type="button" className="btn btn-dark">
                    Book Now
                  </button></Link>
                </div>
              </div>

              <div className="hotelTourPackages mt-3">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    Tiger Valley Resort, Tadoba
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />{" "}
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Tadoba National Park, Moharli Gate,
                     Maharashtra 442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <CiBeaker1 /> Facilities: Restaurent, Room Service on
                    Request, House
                  </p>
                  <p className="pb-4">
                    <MdOutlineWatchLater /> 1 Night/2 Days <FaCarAlt /> 1 Jeep
                    Safari Deluxe Room
                  </p>
                </div>

                <div className="ps-5 ms-auto text-end tourhotside">
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 21094</s>
                  <h4> &#x20B9; 13444</h4>
                  <p>
                    + &#x20B9; 0 taxes & fees 
                    per night
                  </p>
                    <Link to="/booking"> <button type="button" className="btn btn-dark">
                    Book Now
                  </button></Link>
                </div>
              </div>

              <div className="hotelTourPackages mt-3">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    Tiger Valley Resort, Tadoba
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />{" "}
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Tadoba National Park, Moharli Gate,
                     Maharashtra 442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <CiBeaker1 /> Facilities: Restaurent, Room Service on
                    Request, House
                  </p>
                  <p className="pb-4">
                    <MdOutlineWatchLater /> 1 Night/2 Days <FaCarAlt /> 1 Jeep
                    Safari Deluxe Room
                  </p>
                </div>

                <div className="ps-5 ms-auto text-end tourhotside">
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 21094</s>
                  <h4> &#x20B9; 13444</h4>
                  <p>
                    + &#x20B9; 0 taxes & fees 
                    per night
                  </p>
                    <Link to="/booking"> <button type="button" className="btn btn-dark">
                    Book Now
                  </button></Link>
                </div>
              </div>

              <div className="hotelTourPackages mt-3">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    Tiger Valley Resort, Tadoba
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />
                    <FaStar style={{ color: "#FFD43B" }} />{" "}
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Tadoba National Park, Moharli Gate,
                     Maharashtra 442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <CiBeaker1 /> Facilities: Restaurent, Room Service on
                    Request, House
                  </p>
                  <p className="pb-4">
                    <MdOutlineWatchLater /> 1 Night/2 Days <FaCarAlt /> 1 Jeep
                    Safari Deluxe Room
                  </p>
                </div>

                <div className="ps-5 ms-auto text-end tourhotside">
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 21094</s>
                  <h4> &#x20B9; 13444</h4>
                  <p>
                    + &#x20B9; 0 taxes & fees 
                    per night
                  </p>
                    <Link to="/booking"> <button type="button" className="btn btn-dark">
                    Book Now
                  </button></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <h6 className="">Showing 1 - 5 of 5 Hotels</h6>
        <hr />
        <section>
          <h2>Tour Itinerary</h2>
          <div className="day1Border">
            <h4>Arrival at Nagpur & Transfer to Tadoba (Day 1)</h4>
            <div className="day1Tadoba">
              <p>
                After your arrival at the Nagpur railway station/ Airport, reach
                tadoba national park (140 km) via cab or local taxis. Once
                reached, complete the check-in formalities at the pre-booked
                resort and enjoy your lunch. Post lunch get ready for
                enthralling Jeep Safari ride in Tadoba National Park. Tadoba is
                an abode of species like tigers, sloth bear, jackals, hyenas,
                sambar, cheetal and many more will make your day. The oldest and
                largest national park of Maharashtra, Tadoba houses around 195
                birds and 74 butterflies. Thrill is not yet over as the 3 hours
                safari covers many birds, animals. Now you can be back to your
                cozy staying hotel for a deep relaxation. If you are the one who
                believes in making every bit of your travel then nature walk &
                bird-watching in the resort premises would be ideal. Evening
                will be enriched with high tea, some wonderful moments with the
                locals.
              </p>
              <img src={day1package} className="day1package" alt="" />
            </div>
          </div>

          <div className="day1Border mt-5">
            <h4>Jeep Safari ride in Tadoba National Park (Day 2)</h4>
            <div className="day1Tadoba">
              <p>
                After your arrival at the Nagpur railway station/ Airport, reach
                tadoba national park (140 km) via cab or local taxis. Once
                reached, complete the check-in formalities at the pre-booked
                resort and enjoy your lunch. Post lunch get ready for
                enthralling Jeep Safari ride in Tadoba National Park. Tadoba is
                an abode of species like tigers, sloth bear, jackals, hyenas,
                sambar, cheetal and many more will make your day. The oldest and
                largest national park of Maharashtra, Tadoba houses around 195
                birds and 74 butterflies. Thrill is not yet over as the 3 hours
                safari covers many birds, animals. Now you can be back to your
                cozy staying hotel for a deep relaxation. If you are the one who
                believes in making every bit of your travel then nature walk &
                bird-watching in the resort premises would be ideal. Evening
                will be enriched with high tea, some wonderful moments with the
                locals.
              </p>
              <img src={day2package} className="day1package" alt="" />
            </div>
          </div>
        </section>
        <section>
          <div className="day1Border mt-3">
            <div className="d-flex">
              <ul>
                <h4>Inclusion</h4>
                <li>Breakfast & dinner at resor</li>
                <li>1 Jeep inside the Tadoba National Park</li>
                <li>Expert guide during the safari</li>
                <li>
                  Complimentary use of recreational activities in resort
                  premises.
                </li>
              </ul>
              <ul>
                <h4>Exclusion</h4>
                <li>Any airfare, train fare, transport & sightseeing.</li>
                <li>
                  Personal nature items like softdrink, hard drink, laundry,
                  camera fee, tips etc.
                </li>
                <li>Any medical or emergency charge.</li>
                <li>GST & PG charges</li>
              </ul>
            </div>
            <h4 className="mx-4">Notes:</h4>
            <ul>
              <li>Breakfast & dinner at resor</li>
              <li>1 Jeep inside the Tadoba National Park</li>
              <li>Expert guide during the safari</li>
              <li>
                Complimentary use of recreational activities in resort premises.
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div className="day1Border mt-3">
            <h4>Terms & conditions:</h4>
            <ul>
              <li>In all hotels base category room will be provided.</li>
              <li>
                In case of upgradation of room will cost extra and pay to the
                hotel directly.
              </li>
              <li>Time of check-in 12:00 noon and check out 11:00 AM.</li>
              <li>
                Please make sure and enter correct age of passengers at the time
                of booking. Passengers furnishing incorrect age may incur
                penalty at the time of travelling.
              </li>
              <li>
                In case of non availability of rooms in mentioned hotel we shall
                provide similar standard hotel.
              </li>
              <li>
                In case of 3 persons, 1 room with 1 extra mattress will be
                provided.
              </li>
              <li>
                Any changes in Govt. taxes, hotel charges, safari charges etc
                will be informed by mail or phone before traveling date.
              </li>
              <li>
                Company will not be responsible for any accident, loss/theft or
                dammage of luggage.
              </li>
              <li>
                We reserve the right to make itinerary and safari changes as
                operational or other circumstances require.
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div className="day1Border mt-3">
            <h4>Policy Regarding Cancellation/ No Show / Early Departure :</h4>

            <p>
              In case if you are postponing or cancelling your tour/travel due
              to any unavoidable reasons, you must intimate us in writing.
              Please make it sure that cancellation charges would be effective
              from the date we receive your mail in writing. Following
              cancellation policy would be applicable:
            </p>
            <ul>
              <li>30 days prior to arrival - 10% of the tour cost.</li>
              <li>
                15 days to 29 days prior to arrival - 30% of the tour cost.
              </li>
              <li>
                07 days to 14 days prior to arrival - 40 % of the tour cost
              </li>
              <li>
                02 days to 06 days prior to arrival - 50% of the tour cost.
              </li>
              <li>Less than 48 hours or no show - NO REFUND.</li>
              <li>Jeep Safari & Canter Safari amount are non refundable. </li>
              <li>
                Any changes in Govt. taxes, hotel charges, safari charges etc
                will be informed by mail or phone before traveling date.
              </li>
              <li>
                Important Note: In case your safari is not booked due to reasons
                like technical error or non-availability of seat, we will refund
                the whole amount in your given bank account. The same would be
                communicated accordingly.
              </li>
              <li>
                In case of peak season: weekends or weekdays (Holi, Diwali,
                X'Mas & New Year) hotel/Forest Lodges bookings separate
                cancellation policy is applicable (which would be advised as and
                when required).
              </li>
              <li>
                Our Liabilities and Limitations: Please note that after you
                finalize the tour/service cost and in case if there are any
                hikes in permit fees of safaris/museums, taxes, fuel cost or
                guide charges decided by the Govt of India, the same would be
                charged as extra.
              </li>
              <li>
                Force Majeure events, strikes, fairs, festivals, weather
                conditions, traffic problems, overbooking of hotels, closure of
                / entry restrictions at a place of visit, etc. While we will do
                our best to make suitable alternate arrangements, we would not
                be held liable for any refunds/compensation claims arising out
                of this.
              </li>
              <li>
                In case of dispute, if any, shall be subject to the exclusive
                jurisdiction of the courts in New Delhi.
              </li>
            </ul>
          </div>
        </section>
        <section>
          <div className="day1Border mt-3">
            <h4>Payment Policy:</h4>
            <ul>
              <li>
                Seven Safar Toor and Travels Ltd. accepts Credit Card, Debit
                Card, Paypal and Direct Deposit as forms of payment.
              </li>
              <li>Kindly make payment only in company accounts.</li>
              <li>
                Travelers can pay 50% advance to hold the booking on confirmed
                basis & rest 50% amount will be settled on arrival/starting the
                tour.
              </li>
              <li>
                Travelers can pay 100% amount to confirm the booking and enjoy
                more discount benefits.
              </li>
              <li>Travelers agree to pay all statutory taxes, surcharges and fees, as applicable.</li>
            </ul>
          </div>
        </section>
      </div>

      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default TourPackageDetail;
