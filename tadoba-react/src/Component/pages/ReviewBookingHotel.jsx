import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import bookingBanner from "../../assets/images/paymentImage.png";
// import { useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
function ReviewBookingHotel() {
    return (
        <>
         <Header></Header>
      <div className="booking leaf">
        <img
          src={bookingBanner}
          className="bookingImgBanner"
          alt="Booking Image"
        />
        <div className="container">
          <div className="tourBooking">
            <h2>Review and Book</h2>

            <h4>Hotel Booking Information</h4>
            <hr />
            <h3>Tiger Valley Resort, Tadoba</h3>
            <p>Address: Tadoba National Park, Moharli Gate, Maharashtra 442404</p>
            <div className="row checkInRow">
              <div className="col-sm-12 col-md-3 col-lg-3">
                <p>Check In</p>
                <h6>Fri 31 Jan 2025</h6>
                <p>No of Person: <br />Adults: 2 <br />Children: 0</p>
              </div>
              <div className="col-sm-12 col-md-3 col-lg-3"> 1 Night/2 Days</div>
              <div className="col-sm-12 col-md-3 col-lg-3">
                <p>Check Out</p>
                <h6>Sat 01 Feb 2025</h6>
                <p>Total Room: 1 Room</p>
              </div>
              <div className="col-sm-12 col-md-3 col-lg-3">
              <p>Room Catgeory:</p>
            <p> <span> Super Deluxe</span><br /></p>
            <p>Meal Plan:</p>
            <p> <span> Only Breakfast</span><br /></p>
             
              </div>
            </div>
            <div>
              <h6 className="mt-4">Price Includes</h6>
              <ul>
                <li>Breakfast & dinner at resort </li>
                <li> 1 Jeep inside the Tadoba National Park</li>
                <li>Expert guide during the safari</li>
                <li>
                  Complimentary use of recreational activities in resort
                  premises.
                </li>
 <Popup
                  className="policy mt-3 "
                  trigger={<button className="popupbutton">Cancellation Policy</button>}
                  position="right center"
                >
                  <div className="popupBox1">
                    
                   
                    <ul>
                      <li>30 days prior to arrival - 0 cancellation.</li>
                      <li>25 to 29 days prior to arrival - 10% of tour cost.</li>
                      <li>30 days prior to arrival - 0 cancellation.</li>
                      <li>25 to 29 days prior to arrival - 10% of tour cost.</li>
                      <li>15 to 24 days prior to arrival - 30% of tour cost.</li>
                      <li>07 to 14 days prior to arrival - 40 % of tour cost.</li>
                      <li>02 to 06 days prior to arrival - 50% of tour cost.</li>
                      <li>Less than 48 hours - NO SHOW/NO REFUND.</li>
                     
                    
                    </ul>
                   
                                     </div>
                </Popup>

                             </ul>
            </div>
          </div>
          <section className="travellerDetail">
            <h4>Traveller’s Details</h4>
            <hr />
            <div className="row">
              <div className="col-sm-12 col-md-5 col-lg-5">
                <label htmlFor="">
                  <span>Full Name</span>
                </label>
                <br />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Full Name"
                />
              </div>
              <div className="col-sm-12 col-md-5 col-lg-5">
                <label htmlFor="">
                  <span>Email Addres</span>(Booking voucher will be sent to this email ID)
                </label>
                <br />
                <input
                  type="email"
                  className="inputField"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-5 col-lg-5">
                <label htmlFor="">
                  <span>Mobile Number</span>
                </label>
                <br />
                <input
                  type="Number"
                  className="inputField"
                  placeholder="Contact Number"
                />
              </div>
              <div className="col-sm-12 col-md-5 col-lg-5">
                <label htmlFor="">
                  <span>City</span>
                </label>
                <br />
                <input
                  type="text"
                  className="inputField"
                  placeholder="Your City"
                />
              </div>
            </div>
            <label htmlFor="">
              <span>Country</span>
            </label>

            <br />
            <select
              name=""
              className="country"
              placeholder="--Select Country--"
              id=""
            >
              <option value="">Select Country</option>
              <option value="">India</option>
              <option value="">China</option>
              <option value="">Nepal</option>
            </select>

            <h4 className="mt-5">Special Request</h4>
            <hr />
            <div className="row">
              <div className="col-sm-12 col-md-2 col-lg-2">
                <input type="checkbox" /> Late Check-In
              </div>
              <div className="col-sm-12 col-md-2 col-lg-2">
                <input type="checkbox" />
                &nbsp;Early Check-In
              </div>
              <div className="col-sm-12 col-md-2 col-lg-2">
                <input type="checkbox" />
                &nbsp;Large Bed
              </div>
              <div className="col-sm-12 col-md-2 col-lg-2">
                <input type="checkbox" />
                &nbsp;Twin Beds
              </div>
              <div className="col-sm-12 col-md-2 col-lg-2">
                <input type="checkbox" />
                &nbsp;High Floor
              </div>

              <input
                type="textarea"
                name=""
                className="specialRequest"
                rows="4"
                cols="50"
                placeholder="Special Requirements"
              />
            </div>
          </section>
          <section>
            <div className="row">
              <div className="col-sm-12 col-md-8 col-lg-8">
                <div className="travellerDetail1 billingBox ">
                  <h4 className="py-3">Package Details</h4>
                  <hr />
                  <p>
                    The total cost consist of the package cost and tax charges.
                  </p>
                  <hr />
                  <div className="billing">
                    <p>Arrival date:</p>
                    <p>01/28/2025</p>
                  </div>
                  <hr />
                  <div className="billing">
                    <p>Duration:</p>
                    <p>1 Night/2 Days</p>
                  </div>
                  <hr />
                  <div className="billing">
                    <p>Noationality:</p>
                    <p>Indian</p>
                  </div>
                  <hr />
                  <div className="billing">
                    <p>Room</p>
                    <p>1 Room</p>
                  </div>
                  <hr />
                  <div className="billing">
                    <p>Grand Total</p>
                    <p>&#x20B9;133444</p>
                  </div>
                  <hr />
                  <div className="billing">
                    <p>Gst + PG Charges</p>
                    <p>&#x20B9;941</p>
                  </div>
                  <hr />
                  <div className="billing paymentCycle">
                    <h5>Net Amount</h5>
                    <h5>&#x20B9;142544</h5>
                  </div>
                </div>
              </div>

              <div className="col-sm-12 col-md-4 col-lg-4">
                <div className="payment">
                  <h4>Payment Options</h4>
                  <hr />

                  <div className="paymentOptions">
                    <p>
                      <input type="radio" /> <span>Pay 50% </span>
                    </p>
                    <p>&#x20B9;7293</p>
                  </div>
                  <hr />
                  <div className="paymentOptions">
                    <p>
                      {" "}
                      <input type="radio" /> <span> Pay in full</span>{" "}
                      (refundable as per cancellation policy)
                    </p>
                    <p>&#x20B9;72963</p>
                  </div>
                  <hr />
                  <p>
                    <input type="checkbox" />{" "}
                    <span>I have read and accept the terms and conditions</span>
                  </p>
                  <button type="button" className="btn btn-primary">
                    Continue To Payment
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
        </>
    )
}

export default ReviewBookingHotel
