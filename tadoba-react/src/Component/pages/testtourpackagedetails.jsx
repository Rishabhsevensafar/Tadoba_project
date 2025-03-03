import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Get package ID from URL
import axios from "axios";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tadobaHotel from "../../assets/images/tadoba1.jpeg";
import day1package from "../../assets/images/navegaon.jpg";
import day2package from "../../assets/images/morpen1.jpg";
import { FaCarAlt, FaHome, FaStar } from "react-icons/fa";
import { CiBeaker1 } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";

function TestTourPackageDetail() {
  const { id } = useParams(); // ✅ Get package ID from URL
  const [packageDetails, setPackageDetails] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tourpackage/${id}`
      );
      setPackageDetails(response.data.package);
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  if (!packageDetails) {
    return <p className="text-center">Loading package details...</p>;
  }

  return (
    <>
      <Header />
      <div className="row hotelback">
        <div className="col-sm-12 col-md-3 col-lg-3 px-2">
          <div className="boxx">
            <select>
              <option value="">Select</option>
              <option value="">Tiger valley resort Tadoba</option>
              <option value="">Tiger valley resort Tadoba</option>
              <option value="">Tiger valley resort Tadoba</option>
            </select>
            <p>All Hotels in Tadoba</p>
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
      </div>

      <div className="container">
        <section>
          <h2>{packageDetails.title}</h2>
          <p>{packageDetails.description}</p>
        </section>

        <section>
          <h5 className="ps-3">Hotels Included in this Package</h5>
          {packageDetails.hotels && packageDetails.hotels.length > 0 ? (
            packageDetails.hotels.map((hotel) => (
              <div className="hotelTourPackages mt-3" key={hotel._id}>
                <div>
                  {/* ✅ Display the first image, if available */}
                  <img
                    src={
                      hotel.images?.length > 0
                        ? `http://localhost:5000${hotel.images[0]}`
                        : tadobaHotel
                    }
                    className="tadobahotelImg"
                    alt="Hotel"
                  />
                </div>
                <div className="ps-4">
                  <h5>{hotel.title || "Hotel Name Not Provided"}</h5>
                  <p>
                    <FaLocationArrow />{" "}
                    {hotel.location?.name || "Location Not Provided"}
                  </p>
                  <p>
                    <CiBeaker1 /> Facilities:{" "}
                    {hotel.amenities?.length
                      ? hotel.amenities.join(", ")
                      : "Not Provided"}
                  </p>
                  <p>
                    <MdOutlineWatchLater /> {packageDetails.duration} |{" "}
                    <FaCarAlt /> 1 Jeep | <FaHome />{" "}
                    {hotel.room_type || "Standard Room"}
                  </p>
                </div>
                <div className="ps-5 ms-auto text-end tourhotside">
                  <div>
                    {[...Array(hotel.number_of_stars || 3)].map((_, index) => (
                      <FaStar key={index} className="stardes" />
                    ))}
                  </div>
                  <s>&#x20B9; {hotel.real_price || "N/A"}</s>
                  <h4> &#x20B9; {hotel.discounted_price || "N/A"}</h4>
                  <p>+ &#x20B9; 0 taxes & fees per night</p>
                  <button type="button" className="btn btn-dark">
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No hotels added to this package.</p>
          )}
        </section>

        {/* ✅ Itinerary Section */}
        <section>
          <h2>Tour Itinerary</h2>
          {packageDetails.itinerary && packageDetails.itinerary.length > 0 ? (
            packageDetails.itinerary.map((day, index) => (
              <div className="day1Border day1Tadoba mt-3" key={index}>
                <div>
                  <h4>{day.title}</h4>
                  <p>{day.activities}</p>
                </div>
                <img
                  src={index % 2 === 0 ? day1package : day2package}
                  className="day1package"
                  alt=""
                />
              </div>
            ))
          ) : (
            <p>No itinerary available.</p>
          )}
        </section>

        {/* ✅ Includes & Excludes */}
        <section>
          <div className="day1Border mt-3">
            <div className="d-flex">
              <ul>
                <h4>Inclusions</h4>
                {packageDetails.includes &&
                packageDetails.includes.length > 0 ? (
                  packageDetails.includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No inclusions specified</li>
                )}
              </ul>
              <ul>
                <h4>Exclusions</h4>
                {packageDetails.excludes &&
                packageDetails.excludes.length > 0 ? (
                  packageDetails.excludes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No exclusions specified</li>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* ✅ Terms & Conditions */}
        <section>
          <div className="day1Border mt-3">
            <h4>Terms & Conditions</h4>
            <ul>
              <li>All hotels provide base category rooms.</li>
              <li>Check-in: 12:00 noon, Check-out: 11:00 AM.</li>
              <li>
                Any changes in govt. taxes will be informed before the travel
                date.
              </li>
              <li>
                Company is not responsible for any accidents, loss, or damages.
              </li>
            </ul>
          </div>
        </section>

        {/* ✅ Cancellation Policy */}
        <section>
          <div className="day1Border mt-3">
            <h4>Cancellation Policy</h4>
            <ul>
              <li>30 days prior: 10% of tour cost.</li>
              <li>15-29 days prior: 30% of tour cost.</li>
              <li>2-6 days prior: 50% of tour cost.</li>
              <li>Less than 48 hours: No refund.</li>
            </ul>
          </div>
        </section>
      </div>

      <ImportantLinks />
      <Footer />
    </>
  );
}

export default TestTourPackageDetail;
