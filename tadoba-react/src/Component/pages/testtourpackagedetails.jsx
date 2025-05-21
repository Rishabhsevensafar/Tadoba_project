import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import tadobaHotel from "../../assets/images/tadoba1.jpeg";
import day1package from "../../assets/images/navegaon.jpg";
import day2package from "../../assets/images/morpen1.jpg";
import '../../styles/TourPackageDetails.css'; // Assuming you have a CSS file for styling
import {
  FaBan,
  FaLocationArrow,
  FaUtensils,
  FaWifi,
  FaCarAlt,
  FaHome,
} from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import TourEnquiryModal from "../tourenquirymodel";

function TourPackageDetail() {
  const [date, setDate] = useState(new Date());
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [filters, setFilters] = useState({
    stars: [],
    facilities: [],
    locations: [],
  });
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [allHotels, setAllHotels] = useState([]);

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
    } catch (error) {
      console.error("Error fetching package details:", error);
    }
  };

  const handleOpenEnquiryModal = (hotel) => {
    setSelectedHotel(hotel);
    setShowEnquiryModal(true);
  };

  const handleBookNow = (hotel) => {
    navigate(`/booking/${packageDetails._id}`, { state: { hotel } });
  };

  const handleCloseEnquiryModal = () => setShowEnquiryModal(false);

  if (!packageDetails) {
    return (
      <div className="tp_loading_container">
        <div className="tp_loading_spinner"></div>
        <p className="tp_loading_text">Loading package details...</p>
      </div>
    );
  }

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

  const applyFilters = () => {
    const filteredHotels = allHotels.filter((hotel) => {
      if (
        filters.stars.length > 0 &&
        !filters.stars.includes(hotel.number_of_stars)
      ) {
        return false;
      }

      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every(
          (facility) => hotel.facilities && hotel.facilities.includes(facility)
        );
        if (!hasAllFacilities) return false;
      }

      if (filters.locations.length > 0) {
        if (
          !hotel.location ||
          !filters.locations.includes(hotel.location.name)
        ) {
          return false;
        }
      }

      if (
        hotel.discounted_price < priceRange[0] ||
        hotel.discounted_price > priceRange[1]
      ) {
        return false;
      }

      return true;
    });

    setAllHotels(filteredHotels);
    setShowFilters(false);
  };

  const clearAllFilters = () => {
    setFilters({
      stars: [],
      facilities: [],
      locations: [],
    });
    setPriceRange([0, 100000]);
    setAllHotels(allHotels);
  };

  return (
    <>
      <Header />

      <div className="tp_container">
        {/* Hero Section */}
        <section className="tp_hero_section">
          <div className="tp_hero_content">
            <h1 className="tp_hero_title">{packageDetails.title}</h1>
            <span className="tp_hero_duration">{packageDetails.duration}</span>
            <p className="tp_hero_description">{packageDetails.description}</p>
          </div>
        </section>

        {/* Main Content */}
        <div className="tp_main_content">
          <div className="tp_sidebar_container">
            <div className="tp_filter_header">
              <h3 className="tp_filter_title">FILTER BY</h3>
              <button
                className="tp_toggle_filter_btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            <div
              className={`tp_filter_content ${
                showFilters ? "tp_filter_visible" : "tp_filter_hidden"
              }`}
            >
              <div className="tp_mobile_filter_actions">
                <button className="tp_apply_btn" onClick={applyFilters}>
                  Apply Filters
                </button>
                <button className="tp_clear_btn" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>

              <div className="tp_filter_section">
                <h4 className="tp_filter_section_title">Price Range</h4>
                <div className="tp_filter_price_range">
                  <span className="tp_price_display">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </span>
                  <input
                    type="range"
                    className="tp_price_slider"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                  />
                </div>
              </div>

              <div className="tp_filter_section">
                <h4 className="tp_filter_section_title">Hotel Star</h4>
                <div className="tp_star_filters">
                  {[5, 4, 3, 2, 1].map((starCount) => (
                    <div key={`star-${starCount}`} className="tp_filter_item">
                      <label className="tp_filter_label">
                        <input
                          type="checkbox"
                          checked={filters.stars.includes(starCount)}
                          onChange={() =>
                            handleFilterChange("stars", starCount)
                          }
                          className="tp_filter_checkbox"
                        />
                        <span className="tp_star_display">
                          {[...Array(starCount)].map((_, index) => (
                            <FaStar key={index} className="tp_star_icon" />
                          ))}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tp_filter_section">
                <h4 className="tp_filter_section_title">Facilities</h4>
                <div className="tp_facilities_list">
                  {[
                    "Swimming Pool",
                    "Restaurant",
                    "Room Service",
                    "Free Parking",
                    "Air Conditioning",
                    "Jungle Safari",
                    "Wi-Fi",
                  ].map((facility) => (
                    <div key={facility} className="tp_filter_item">
                      <label className="tp_filter_label">
                        <input
                          type="checkbox"
                          checked={filters.facilities.includes(facility)}
                          onChange={() =>
                            handleFilterChange("facilities", facility)
                          }
                          className="tp_filter_checkbox"
                        />
                        <span className="tp_facility_name">{facility}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tp_filter_section">
                <h4 className="tp_filter_section_title">Location</h4>
                <div className="tp_location_filters">
                  {["Chandrapur", "Nagpur", "Chimur"].map((location) => (
                    <div key={location} className="tp_filter_item">
                      <label className="tp_filter_label">
                        <input
                          type="checkbox"
                          checked={filters.locations.includes(location)}
                          onChange={() =>
                            handleFilterChange("locations", location)
                          }
                          className="tp_filter_checkbox"
                        />
                        <span className="tp_location_name">{location}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tp_filter_actions">
                <button className="tp_apply_btn" onClick={applyFilters}>
                  Apply Filters
                </button>
                <button className="tp_clear_btn" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <div className="tp_content_container">
            <section className="tp_hotels_section">
              <h3 className="tp_section_title">
                Hotels Included in this Package
              </h3>

              {packageDetails.hotels && packageDetails.hotels.length > 0 ? (
                packageDetails.hotels.map((hotel) => (
                  <div className="tp_hotel_card" key={hotel._id}>
                    <div className="tp_hotel_image_container">
                      <img
                        src={
                          hotel.images?.length > 0
                            ? `http://localhost:5001${hotel.images[0]}`
                            : tadobaHotel
                        }
                        className="tp_hotel_image"
                        alt={hotel.title || "Hotel"}
                      />
                    </div>

                    <div className="tp_hotel_info">
                      <h4 className="tp_hotel_title">
                        {hotel.title || "Hotel Name Not Provided"}
                      </h4>

                      <div className="tp_hotel_details">
                        <p className="tp_hotel_location">
                          <FaLocationArrow className="tp_icon" />
                          {hotel.location?.name || "Location Not Provided"}
                        </p>

                        <p className="tp_hotel_amenities">
                          <FaWifi className="tp_icon" />
                          Amenities:{" "}
                          {hotel.amenities?.length
                            ? hotel.amenities.slice(0, 3).join(", ") +
                              (hotel.amenities.length > 3 ? "..." : "")
                            : "Not Provided"}
                        </p>

                        <p className="tp_hotel_facilities">
                          <FaUtensils className="tp_icon" />
                          Facilities:{" "}
                          {hotel.facilities?.length
                            ? hotel.facilities.slice(0, 3).join(", ") +
                              (hotel.facilities.length > 3 ? "..." : "")
                            : "Not Provided"}
                        </p>

                        <p className="tp_hotel_policy">
                          <FaBan className="tp_icon" />
                          <Link className="tp_policy_link">
                            Cancellation Policy
                          </Link>
                        </p>

                        <p className="tp_hotel_package_details">
                          <MdOutlineWatchLater className="tp_icon" />{" "}
                          {packageDetails.duration}
                          <span className="tp_detail_separator">|</span>
                          <FaCarAlt className="tp_icon" /> 1 Jeep
                          <span className="tp_detail_separator">|</span>
                          <FaHome className="tp_icon" />{" "}
                          {hotel.room_type || "Standard Room"}
                        </p>
                      </div>
                    </div>

                    <div className="tp_hotel_pricing">
                      <div className="tp_star_rating">
                        {[...Array(hotel.number_of_stars || 3)].map(
                          (_, index) => (
                            <FaStar key={index} className="tp_rating_star" />
                          )
                        )}
                      </div>

                      <div className="tp_price_info">
                        <span className="tp_original_price">
                          ₹ {hotel.real_price || "N/A"}
                        </span>
                        <span className="tp_discounted_price">
                          ₹ {hotel.discounted_price || "N/A"}
                        </span>
                        <span className="tp_tax_info">
                          + ₹ 0 taxes & fees per night
                        </span>
                      </div>

                      <div className="tp_action_buttons">
                        <button
                          className="tp_enquiry_btn"
                          onClick={() => handleOpenEnquiryModal(hotel)}
                        >
                          Send Enquiry
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="tp_no_hotels">No hotels added to this package.</p>
              )}

              <div className="tp_hotel_count">
                <p>
                  Showing 1 - {packageDetails.hotels?.length || 0} of{" "}
                  {packageDetails.hotels?.length || 0} Hotels
                </p>
              </div>
            </section>

            {/* Itinerary Section */}
            <section className="tp_itinerary_section">
              <h3 className="tp_section_title">Tour Itinerary</h3>

              {packageDetails.itinerary &&
              packageDetails.itinerary.length > 0 ? (
                packageDetails.itinerary.map((day, index) => (
                  <div className="tp_itinerary_card" key={index}>
                    <div className="tp_itinerary_content">
                      <h4 className="tp_itinerary_day">{day.title}</h4>
                      <p className="tp_itinerary_activities">
                        {day.activities}
                      </p>
                    </div>
                    <div className="tp_itinerary_image_container">
                      <img
                        src={index % 2 === 0 ? day1package : day2package}
                        className="tp_itinerary_image"
                        alt={day.title}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="tp_no_itinerary">No itinerary available.</p>
              )}
            </section>

            {/* Includes & Excludes Section */}
            <section className="tp_includes_section">
              <div className="tp_includes_card">
                <div className="tp_includes_content">
                  <div className="tp_includes_column">
                    <h4 className="tp_includes_title">Inclusions</h4>
                    <ul className="tp_includes_list">
                      {packageDetails.includes &&
                      packageDetails.includes.length > 0 ? (
                        packageDetails.includes.map((item, index) => (
                          <li key={index} className="tp_includes_item">
                            {item}
                          </li>
                        ))
                      ) : (
                        <li className="tp_includes_item">
                          No inclusions specified
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="tp_includes_column">
                    <h4 className="tp_includes_title">Exclusions</h4>
                    <ul className="tp_includes_list">
                      {packageDetails.excludes &&
                      packageDetails.excludes.length > 0 ? (
                        packageDetails.excludes.map((item, index) => (
                          <li key={index} className="tp_includes_item">
                            {item}
                          </li>
                        ))
                      ) : (
                        <li className="tp_includes_item">
                          No exclusions specified
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Terms & Conditions */}
            <section className="tp_terms_section">
              <div className="tp_terms_card">
                <h4 className="tp_terms_title">Terms & Conditions</h4>
                <div className="tp_terms_content">
                  <ul>
                    <li>In all hotels base category room will be provided.</li>
                    <li>
                      In case of upgradation of room will cost extra and pay to
                      the hotel directly.
                    </li>
                    <li>Time of check-in 12:00 noon and check out 11:00 AM.</li>
                    <li>
                      Please make sure and enter correct age of passengers at
                      the time of booking. Passengers furnishing incorrect age
                      may incur penalty at the time of travelling.
                    </li>
                    <li>
                      In case of non availability of rooms in mentioned hotel we
                      shall provide similar standard hotel.
                    </li>
                    <li>
                      In case of 3 persons, 1 room with 1 extra mattress will be
                      provided.
                    </li>
                    <li>
                      Any changes in Govt. taxes, hotel charges, safari charges
                      etc will be informed by mail or phone before traveling
                      date.
                    </li>
                    <li>
                      Company will not be responsible for any accident,
                      loss/theft or dammage of luggage.
                    </li>
                    <li>
                      We reserve the right to make itinerary and safari changes
                      as operational or other circumstances require.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section className="tp_policy_section">
              <div className="tp_policy_card">
                <h4 className="tp_policy_title">
                  Policy Regarding Cancellation/ No Show / Early Departure :
                </h4>
                <div className="tp_policy_content">
                  <p>
                    In case if you are postponing or cancelling your tour/travel
                    due to any unavoidable reasons, you must intimate us in
                    writing. Please make it sure that cancellation charges would
                    be effective from the date we receive your mail in writing.
                    Following cancellation policy would be applicable:
                  </p>
                  <ul>
                    <li>30 days prior to arrival - 10% of the tour cost.</li>
                    <li>
                      15 days to 29 days prior to arrival - 30% of the tour
                      cost.
                    </li>
                    <li>
                      07 days to 14 days prior to arrival - 40 % of the tour
                      cost
                    </li>
                    <li>
                      02 days to 06 days prior to arrival - 50% of the tour
                      cost.
                    </li>
                    <li>Less than 48 hours or no show - NO REFUND.</li>
                    <li>
                      Jeep Safari & Canter Safari amount are non refundable.{" "}
                    </li>
                    <li>
                      Any changes in Govt. taxes, hotel charges, safari charges
                      etc will be informed by mail or phone before traveling
                      date.
                    </li>
                    <li>
                      Important Note: In case your safari is not booked due to
                      reasons like technical error or non-availability of seat,
                      we will refund the whole amount in your given bank
                      account. The same would be communicated accordingly.
                    </li>
                    <li>
                      In case of peak season: weekends or weekdays (Holi,
                      Diwali, X'Mas & New Year) hotel/Forest Lodges bookings
                      separate cancellation policy is applicable (which would be
                      advised as and when required).
                    </li>
                    <li>
                      Our Liabilities and Limitations: Please note that after
                      you finalize the tour/service cost and in case if there
                      are any hikes in permit fees of safaris/museums, taxes,
                      fuel cost or guide charges decided by the Govt of India,
                      the same would be charged as extra.
                    </li>
                    <li>
                      Force Majeure events, strikes, fairs, festivals, weather
                      conditions, traffic problems, overbooking of hotels,
                      closure of / entry restrictions at a place of visit, etc.
                      While we will do our best to make suitable alternate
                      arrangements, we would not be held liable for any
                      refunds/compensation claims arising out of this.
                    </li>
                    <li>
                      In case of dispute, if any, shall be subject to the
                      exclusive jurisdiction of the courts in New Delhi.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Payment Policy */}
            <section className="tp_payment_section">
              <div className="tp_payment_card">
                <h4 className="tp_payment_title">Payment Policy</h4>
                <div className="tp_payment_content">
                  <ul>
                    <li>
                      Seven Safar Toor and Travels Ltd. accepts Credit Card,
                      Debit Card, Paypal and Direct Deposit as forms of payment.
                    </li>
                    <li>Kindly make payment only in company accounts.</li>
                    <li>
                      Travelers can pay 50% advance to hold the booking on
                      confirmed basis & rest 50% amount will be settled on
                      arrival/starting the tour.
                    </li>
                    <li>
                      Travelers can pay 100% amount to confirm the booking and
                      enjoy more discount benefits.
                    </li>
                    <li>
                      Travelers agree to pay all statutory taxes, surcharges and
                      fees, as applicable.
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <ImportantLinks />
      <Footer />

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
