import React from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tadobaHotel from "../../assets/images/tadoba1.jpeg";
import day1package from "../../assets/images/navegaon.jpg";
import { useState } from "react";
import {
  FaBan,
  FaClock,
  FaLocationArrow,
  FaUtensils,
  FaWifi,
} from "react-icons/fa6";
import { FaCarAlt, FaRemoveFormat } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CiBeaker1 } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import day2package from "../../assets/images/morpen1.jpg";
import { Flex } from "antd";
import "../../styles/TourPackageDetails.css";
import TourEnquiryModal from "../tourenquirymodel";

function TourPackageDetail() {
  const [date, setDate] = useState(new Date());
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    stars: [],
    facilities: [],
    locations: [],
  });
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  // NEW: Added filteredHotels state to store filtered results
  const [filteredHotels, setFilteredHotels] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackageDetails();
  }, []);

  const fetchPackageDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/tourpackage/${id}`
      );
      setPackageDetails(response.data.package);

      // NEW: Initialize filteredHotels with all hotels from the package
      if (response.data.package && response.data.package.hotels) {
        setFilteredHotels(response.data.package.hotels);
      }
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  const handleOpenEnquiryModal = (hotel) => {
    console.log("Selected Hotel:", hotel);
    setSelectedHotel(hotel);
    setShowEnquiryModal(true);
  };

  const handleBookNow = (hotel) => {
    navigate(`/booking/${packageDetails._id}`, { state: { hotel } });
  };

  const handleCloseEnquiryModal = () => setShowEnquiryModal(false);

  // Add this function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (filterType === "stars") {
        if (updatedFilters.stars.includes(value)) {
          updatedFilters.stars = updatedFilters.stars.filter(
            (item) => item !== value
          );
        } else {
          updatedFilters.stars = [...updatedFilters.stars, value];
        }
      } else if (filterType === "facilities") {
        if (updatedFilters.facilities.includes(value)) {
          updatedFilters.facilities = updatedFilters.facilities.filter(
            (item) => item !== value
          );
        } else {
          updatedFilters.facilities = [...updatedFilters.facilities, value];
        }
      } else if (filterType === "locations") {
        if (updatedFilters.locations.includes(value)) {
          updatedFilters.locations = updatedFilters.locations.filter(
            (item) => item !== value
          );
        } else {
          updatedFilters.locations = [...updatedFilters.locations, value];
        }
      }

      return updatedFilters;
    });
  };

  // Function to apply filters - separate from handleFilterChange
  const applyFilters = () => {
    if (!packageDetails || !packageDetails.hotels) return;

    const filteredHotels = packageDetails.hotels.filter((hotel) => {
      // Filter by stars - only filter if some stars are selected
      if (
        filters.stars.length > 0 &&
        !filters.stars.includes(hotel.number_of_stars)
      ) {
        return false;
      }

      // Filter by facilities - only if some facilities are selected
      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every(
          (facility) => hotel.facilities && hotel.facilities.includes(facility)
        );
        if (!hasAllFacilities) return false;
      }

      // Filter by location - only if some locations are selected
      if (filters.locations.length > 0) {
        if (
          !hotel.location ||
          !filters.locations.includes(hotel.location.name)
        ) {
          return false;
        }
      }

      // Filter by price
      if (
        hotel.discounted_price < priceRange[0] ||
        hotel.discounted_price > priceRange[1]
      ) {
        return false;
      }

      return true;
    });

    setFilteredHotels(filteredHotels);
    setShowFilters(false); // Hide filters after applying on mobile
  };

  // Function to clear all filters
  const clearAllFilters = () => {
    setFilters({
      stars: [],
      facilities: [],
      locations: [],
    });
    setPriceRange([0, 100000]);

    // Reset to all hotels from the package
    if (packageDetails && packageDetails.hotels) {
      setFilteredHotels(packageDetails.hotels);
    }
  };

  if (!packageDetails) {
    return <p className="text-center">Loading package details...</p>;
  }

  return (
    <>
      <Header></Header>

      <div className="container">
        <section className="package-intro">
          <h1 className="package-title">
            {packageDetails.title}{" "}
            <span className="package-duration">
              ({packageDetails.duration})
            </span>
          </h1>
          <p className="package-description">{packageDetails.description}</p>
        </section>

        <section className="hf-section">
          {/* FILTERS */}
          <div className="hf-filters-wrapper">
            <div className="hf-filters-toggle d-md-none">
              <button
                className="filter-toggle-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            <div
              className={`hf-filters-row ${
                showFilters ? "d-block" : "d-none d-md-flex"
              }`}
            >
              {/* Price Dropdown */}
              <div className="hf-filter-box">
                <label>Price Range</label>
                <select
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                >
                  {[1000, 5000, 10000, 20000, 50000, 100000].map((val) => (
                    <option key={val} value={val}>
                      Up to ₹{val}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stars */}
              <div className="hf-filter-box">
                <label>Hotel Rating</label>
                <select
                  onChange={(e) =>
                    handleFilterChange("stars", parseInt(e.target.value))
                  }
                  defaultValue=""
                >
                  <option value="">All Ratings</option>
                  {[5, 4, 3, 2, 1].map((val) => (
                    <option key={val} value={val}>
                      {val} Stars
                    </option>
                  ))}
                </select>
              </div>

              {/* Facilities */}
              <div className="hf-filter-box">
                <label>Facility</label>
                <select
                  onChange={(e) =>
                    handleFilterChange("facilities", e.target.value)
                  }
                  defaultValue=""
                >
                  <option value="">All</option>
                  {[
                    "Swimming Pool",
                    "Restaurant",
                    "Room Service",
                    "Bonfire",
                    "CCTV",
                    "Jacuzzi",
                    "Jungle Safari",
                  ].map((fac) => (
                    <option key={fac} value={fac}>
                      {fac}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div className="hf-filter-box">
                <label>Location</label>
                <select
                  onChange={(e) =>
                    handleFilterChange("locations", e.target.value)
                  }
                  defaultValue=""
                >
                  <option value="">All</option>
                  {["Chandrapur", "Nagpur", "Chimur"].map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hf-filter-actions">
                <button onClick={applyFilters}>Apply</button>
                <button onClick={clearAllFilters}>Clear</button>
              </div>
            </div>
          </div>

          {/* HOTEL GRID */}
          <h2>List of Hotels in Package</h2>
          <div className="hf-hotel-grid">
            {filteredHotels?.length > 0 ? (
              filteredHotels.map((hotel) => (
                <div className="hf-hotel-card" key={hotel._id}>
                  <img
                    src={
                      hotel.images?.[0]
                        ? `http://localhost:5001${hotel.images[0]}`
                        : "/placeholder.jpg"
                    }
                    className="hf-card-img"
                    alt={hotel.title}
                  />

                  <div className="hf-card-content">
                    {/* Header */}
                    <div className="hf-card-header">
                      <h4 className="hf-title">{hotel.title}</h4>
                      <div className="hf-stars-price">
                        <div className="hf-price-block">
                          <s className="hf-price-old">₹{hotel.real_price}</s>
                          <div className="hf-price-current">
                            ₹{hotel.discounted_price}
                          </div>
                          <div className="hf-price-tax">+ ₹0 taxes & fees</div>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <p className="hf-location">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {hotel.location?.name || "Location Not Provided"}
                    </p>
                    <div class="hotel-stars">
                      {[...Array(hotel.number_of_stars || 3)].map((_, i) => (
                        <i key={i} class="fas fa-star"></i>
                      ))}
                      <span>{hotel.number_of_stars || 3}-Star</span>
                    </div>
                    {/* Amenities */}
                    <p className="hf-feature-line">
                      <FaWifi />
                      <strong>Amenities:</strong>{" "}
                      {hotel.amenities?.slice(0, 1).join(", ") ||
                        "Not Provided"}
                      {hotel.amenities?.length > 1 && (
                        <span className="hf-more">
                          +{hotel.amenities.length - 1} more
                          <div className="hf-popup">
                            {hotel.amenities.map((a, i) => (
                              <div key={i} className="hf-popup-item">
                                {a}
                              </div>
                            ))}
                          </div>
                        </span>
                      )}
                    </p>

                    {/* Facilities */}
                    <p className="hf-feature-line">
                      <FaUtensils />
                      <strong>Facilities:</strong>{" "}
                      {hotel.facilities?.slice(0, 1).join(", ") ||
                        "Not Provided"}
                      {hotel.facilities?.length > 1 && (
                        <span className="hf-more">
                          +{hotel.facilities.length - 1} more
                          <div className="hf-popup">
                            {hotel.facilities.map((f, i) => (
                              <div key={i} className="hf-popup-item">
                                {f}
                              </div>
                            ))}
                          </div>
                        </span>
                      )}
                    </p>

                    <p className="hf-feature-line">
                      <FaClock /> {packageDetails.duration}{" "}
                      <span className="hf-divider">|</span>
                      <i className="fas fa-car"></i> 1 Jeep{" "}
                      <span className="hf-divider">|</span>
                      <i className="fas fa-home"></i>{" "}
                      {hotel.room_type || "Standard"}
                    </p>

                    {/* Send Enquiry Button */}
                    <div className="hf-bottom">
                      <button
                        className="hf-btn-enquiry"
                        onClick={() => handleOpenEnquiryModal(hotel)}
                      >
                        Send Enquiry
                      </button>
                      <button
                        type="button"
                        className="hf-btn-book-now"
                        onClick={() => handleBookNow(hotel)} // ✅ Ensure hotel is passed
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="hf-no-hotels">No hotels found</p>
            )}
          </div>
        </section>

        {/* Rest of the component remains unchanged... */}
        <section>
          <h2>Tour Itinerary</h2>
          {packageDetails.itinerary && packageDetails.itinerary.length > 0 ? (
            packageDetails.itinerary.map((day, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  className={`day1Border day1Tadoba mt-4 d-flex align-items-center flex-wrap gap-4 ${
                    isEven ? "flex-row" : "flex-row-reverse"
                  }`}
                  key={index}
                >
                  <div
                    className="flex-grow-1"
                    style={{ flex: 1, minWidth: "250px" }}
                  >
                    <h4>{day.title}</h4>
                    <p>{day.activities}</p>
                  </div>
                  <div
                    className="flex-shrink-0"
                    style={{ flexBasis: "380px", maxWidth: "100%" }}
                  >
                    <img
                      src={
                        day.image
                          ? `http://localhost:5001/uploads/itinerary/${day.image}`
                          : "/images/navegaon.jpg"
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/navegaon.jpg";
                      }}
                      className="img-fluid rounded shadow-sm"
                      alt={day.title}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No itinerary available.</p>
          )}
        </section>

        {/* ✅ Includes & Excludes */}
        {/* ✅ Includes & Excludes */}
        <section>
          <div className="day1Border mt-3">
            <div className="inclusions-exclusions-container">
              <div className="inclusion-exclusion-box">
                <h4 className="inclusion-exclusion-title">Inclusions</h4>
                <ul className="inclusion-exclusion-list">
                  {packageDetails.includes &&
                  packageDetails.includes.length > 0 ? (
                    packageDetails.includes.map((item, index) => (
                      <li key={index}>
                        <span className="check-icon">✓</span> {item}
                      </li>
                    ))
                  ) : (
                    <li>No inclusions specified</li>
                  )}
                </ul>
              </div>

              <div className="inclusion-exclusion-box">
                <h4 className="inclusion-exclusion-title">Exclusions</h4>
                <ul className="inclusion-exclusion-list">
                  {packageDetails.excludes &&
                  packageDetails.excludes.length > 0 ? (
                    packageDetails.excludes.map((item, index) => (
                      <li key={index}>
                        <span className="cross-icon">✗</span> {item}
                      </li>
                    ))
                  ) : (
                    <li>No exclusions specified</li>
                  )}
                </ul>
              </div>

              <div className="inclusion-exclusion-box">
                <h4 className="inclusion-exclusion-title">Notes:</h4>
                <ul className="inclusion-exclusion-list">
                  <li>
                    <span className="info-icon">ℹ</span> Breakfast & dinner at
                    resort
                  </li>
                  <li>
                    <span className="info-icon">ℹ</span> 1 Jeep inside the
                    Tadoba National Park
                  </li>
                  <li>
                    <span className="info-icon">ℹ</span> Expert guide during the
                    safari
                  </li>
                  <li>
                    <span className="info-icon">ℹ</span> Complimentary use of
                    recreational activities in resort premises.
                  </li>
                </ul>
              </div>
            </div>
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
                Important Note: In case your safari is not booked due to reasons
                like technical error or non-availability of seat, we will refund
                the whole amount in your given bank account. The same would be
                communicated accordingly.
              </li>
              <li>
                In case of peak season: weekends or weekdays (Holi, Diwali,
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
        <section className="mb-3">
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
              <li>
                Travelers agree to pay all statutory taxes, surcharges and fees,
                as applicable.
              </li>
            </ul>
          </div>
        </section>
      </div>

      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
      <TourEnquiryModal
        show={showEnquiryModal}
        handleClose={handleCloseEnquiryModal}
        hotel={selectedHotel}
        packageId={packageDetails._id}
      />
    </>
  );
}

export default TourPackageDetail;
