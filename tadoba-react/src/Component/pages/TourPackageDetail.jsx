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
import { FaBan, FaLocationArrow, FaUtensils, FaWifi } from "react-icons/fa6";
import { FaCarAlt, FaRemoveFormat } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CiBeaker1 } from "react-icons/ci";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import day2package from "../../assets/images/morpen1.jpg";
import { Flex } from "antd";
import TourEnquiryModal from "../tourenquirymodel";
function TourPackageDetail() {
  const [date, setDate] = useState(new Date());
  const { id } = useParams(); // ✅ Get package ID from URL
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
  const [allHotels, setAllHotels] = useState([]); // Store all hotels initially

  const navigate = useNavigate();
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
  const handleOpenEnquiryModal = (hotel) => {
    console.log("Selected Hotel:", hotel); // ✅ Debugging: Check if hotel object is correct
    setSelectedHotel(hotel);
    setShowEnquiryModal(true);
  };
  const handleBookNow = (hotel) => {
    navigate(`/booking/${packageDetails._id}`, { state: { hotel } }); // ✅ Passing hotel data
  };

  const handleCloseEnquiryModal = () => setShowEnquiryModal(false);

  if (!packageDetails) {
    return <p className="text-center">Loading package details...</p>;
  }
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
    const filteredHotels = allHotels.filter((hotel) => {
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

    setHotels(filteredHotels);
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
    setHotels(allHotels); // Restore all hotels
  };

  return (
    <>
      <Header></Header>

      <div className="container">
        <section>
          <h2>
            {packageDetails.title} - {packageDetails.duration}
          </h2>
          <p>{packageDetails.description}</p>
        </section>
        <section>
          <div className="row">
            <div className="col-sm-12 col-md-3 col-lg-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="ps-3">FILTER BY</h5>
                <button
                  className="btn btn-sm btn-outline-secondary d-md-none"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              <div
                className={`filterBar ps-3 ${
                  showFilters ? "d-block" : "d-none d-md-block"
                }`}
              >
                <div className="d-md-none d-flex justify-content-between mb-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </button>
                </div>

                <h6>Filter price</h6>
                <hr />
                <div className="mb-3">
                  <label htmlFor="priceRange" className="form-label">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    id="priceRange"
                  />
                </div>
                <hr />
                <div>
                  <h6>Hotel Star</h6>
                  {[5, 4, 3, 2, 1].map((starCount) => (
                    <p key={`star-${starCount}`}>
                      <input
                        type="checkbox"
                        id={`star-${starCount}`}
                        checked={filters.stars.includes(starCount)}
                        onChange={() => handleFilterChange("stars", starCount)}
                        className="me-2"
                      />
                      {[...Array(starCount)].map((_, index) => (
                        <FaStar
                          key={index}
                          className="mb-1 ms-1"
                          style={{ color: "#FFD43B" }}
                        />
                      ))}
                      <br />
                    </p>
                  ))}
                </div>
                <hr />
                <div>
                  <h6>Facilities</h6>
                  <div
                    className="facilities-list"
                    style={{ maxHeight: "200px", overflowY: "auto" }}
                  >
                    {[
                      "Swimming Pool",
                      "Power Backup",
                      "Restaurant",
                      "Room Service",
                      "House Keeping",
                      "Refrigerator",
                      "Indoor Games",
                      "Kids Play Area",
                      "Jungle Safari",
                      "Free Parking",
                      "Air Conditioning",
                      "Bonfire",
                      "Dinning Area",
                      "CCTV",
                      "Fire Extinguishers",
                      "Jacuzzi",
                      "First Aid Services",
                      "Activity Centre",
                      "Pool Towels",
                      "Wake Up Call",
                      "Outdoor Sports",
                      "Lawn",
                    ].map((facility) => (
                      <p key={facility}>
                        <input
                          type="checkbox"
                          id={`facility-${facility}`}
                          checked={filters.facilities.includes(facility)}
                          onChange={() =>
                            handleFilterChange("facilities", facility)
                          }
                          className="me-2"
                        />
                        {facility}
                      </p>
                    ))}
                  </div>
                </div>
                <hr />
                <div>
                  <h6>Location</h6>
                  <div>
                    {["Chandrapur", "Nagpur", "Chimur"].map((location) => (
                      <p key={location}>
                        <input
                          type="checkbox"
                          id={`location-${location}`}
                          checked={filters.locations.includes(location)}
                          onChange={() =>
                            handleFilterChange("locations", location)
                          }
                          className="me-2"
                        />
                        {location}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="text-center my-3 d-none d-md-block">
                  <button
                    className="btn btn-primary me-2"
                    onClick={applyFilters}
                  >
                    Apply Filters
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={clearAllFilters}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-9 col-lg-9 ">
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
                      <div className="ps-0 ps-md-4">
                        <h5>{hotel.title || "Hotel Name Not Provided"}</h5>
                        <p>
                          <FaLocationArrow />{" "}
                          {hotel.location?.name || "Location Not Provided"}
                        </p>
                        <p>
                          <FaWifi /> Amenities:{" "}
                          {hotel.amenities?.length
                            ? hotel.amenities.join(", ")
                            : "Not Provided"}
                        </p>
                        <p>
                          <FaUtensils /> Facilities:{" "}
                          {hotel.facilities?.length
                            ? hotel.facilities.join(", ")
                            : "Not Provided"}
                        </p>
                        <div>
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <FaBan />
                            <Link
                              style={{
                                textDecoration: "none",
                                marginLeft: "3px",
                              }}
                            >
                              Cancelation Policy
                            </Link>
                          </p>
                        </div>
                        <p>
                          <MdOutlineWatchLater /> {packageDetails.duration} |{" "}
                          <FaCarAlt /> 1 Jeep | <FaHome />{" "}
                          {hotel.room_type || "Standard Room"}
                        </p>
                      </div>

                      <div className="ps-0 ps-md-5 ms-md-auto text-md-end tourhotside">
                        <div>
                          {[...Array(hotel.number_of_stars || 3)].map(
                            (_, index) => (
                              <FaStar key={index} className="stardes" />
                            )
                          )}
                        </div>
                        <s>&#x20B9; {hotel.real_price || "N/A"}</s>
                        <h4> &#x20B9; {hotel.discounted_price || "N/A"}</h4>
                        <p>+ &#x20B9; 0 taxes & fees per night</p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                          }}
                        >
                          {/* <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => handleBookNow(hotel)} // ✅ Ensure hotel is passed
                          >
                            Book Now
                          </button> */}

                          <button
                            className="btn btn-dark"
                            onClick={() => handleOpenEnquiryModal(hotel)}
                          >
                            Send Enquiry
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hotels added to this package.</p>
                )}
              </section>
            </div>
          </div>
        </section>
        <h6 className="">Showing 1 - 5 of 5 Hotels</h6>
        <hr />
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
            <div className=" INCLISionExclusion">
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
              <div className="d-flex flex-column">
                <h4 className="mx-4">Notes:</h4>
                <ul>
                  <li>Breakfast & dinner at resor</li>
                  <li>1 Jeep inside the Tadoba National Park</li>
                  <li>Expert guide during the safari</li>
                  <li>
                    Complimentary use of recreational activities in resort
                    premises.
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
