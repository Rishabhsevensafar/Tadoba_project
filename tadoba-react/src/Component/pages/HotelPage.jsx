import React from "react";
import { Link } from "react-router-dom";
import hotelBanner1 from "../../assets/images/hotel-banner1.jpg";
import hotelBanner2 from "../../assets/images/hotel-banner2.jpg";
import hotelBanner3 from "../../assets/images/hotel-banner3.jpg";
// import tadobaHotel from "../../assets/images/caption.jpg";
import Header from "../Header";
import axios from "axios";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import { useState } from "react";
import { FaBan, FaLocationDot, FaWifi } from "react-icons/fa6";
// import { TiLocationArrow } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import defaultHotelImage from "../../assets/images/caption.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HotelPage() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [count, setCount] = useState(0);
  const [hotels, setHotels] = useState([]); // ✅ Store fetched hotels
  const [filters, setFilters] = useState({
    stars: [],
    facilities: [],
    locations: [],
  });
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [allHotels, setAllHotels] = useState([]); // Store all hotels initially
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHotels();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  
  // Update your fetchHotels function to store all hotels
  const fetchHotels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/hotel/hotel-packages"
      );
      setAllHotels(response.data.hotels); // Store all hotels
      setHotels(response.data.hotels); // Display all hotels initially
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };
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
    // Slider settings
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  return (
    <>
      <Header></Header>

      <div >
        {isMobile ? (
          <Slider {...sliderSettings}>
            <div
            >
              <img src={hotelBanner1} className="tourPackageImg" alt="Tour Package 1" />
            </div>
            <div>
              <img src={hotelBanner2} className="tourPackageImg" alt="Tour Package 2" />
            </div>
            <div>
              <img src={hotelBanner3} className="tourPackageImg" alt="Tour Package 3" />
            </div>
          </Slider>
        ) : (
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4 p-0">
              <img src={hotelBanner1} className="tourPackageImg pe-lg-1" alt="Tour Package 1" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 p-0">
              <img src={hotelBanner2} className="tourPackageImg pe-lg-1" alt="Tour Package 2" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 p-0">
              <img src={hotelBanner3} className="tourPackageImg" alt="Tour Package 3" />
            </div>
          </div>
        )}
      </div>

      {/* <div className="row hotelback hotelpagefilter">
        <div className="col-sm-12 col-md-5 col-lg-5 px-3">
          <div className="boxx">
            <select>
              <option value="">Hotels in tadoba</option>
              <option value="">Tiger valley resort Tdaoba</option>
              <option value="">Tiger valley resort Tdaoba</option>
              <option value="">Tiger valley resort Tdaoba</option>
            </select>
          </div>
        </div>
        <div className="col-sm-12 col-md-5 col-lg-5 px-3 ">
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
          </div>
        </div>
        <div className="col-sm-12 col-md-2 col-lg-2 px-3">
          <div className="boxxSearch">
            <a href="#">Search</a>
          </div>
        </div>{" "}
      </div> */}
      <section className="leaf">
        <div className="container">
          <div className="row">
            {/* Filter */}
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

            {/* <p>5 Hotels Found</p> */}
            <div className="col-sm-12 col-md-9">
              {hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <div key={hotel._id} className="hotel mt-3 allhoteldes">
                    <div>
                      <img
                        src={
                          hotel.images && hotel.images.length > 0
                            ? `http://localhost:5000${hotel.images[0]}`
                            : defaultHotelImage
                        }
                        className="tadobahotelImg"
                        alt={hotel.title}
                      />
                    </div>
                    <div className="ps-4">
                      <h5>
                        <Link to={`/hoteldetail/${hotel._id}`}>
                          {hotel.title}
                        </Link>
                      </h5>
                      <p>
                        <FaLocationDot />
                        <strong> Address: </strong>
                        {hotel.location?.name ||
                          "Location Not Available"} - {hotel.location?.pincode}
                      </p>

                      {/* ✅ Display only 3 amenities with title icon */}
                      <p>
                        <FaStar style={{ color: "#FFD43B" }} />
                        <strong> Amenities: </strong>{" "}
                        {hotel.amenities && hotel.amenities.length > 0 ? (
                          <>
                            {hotel.amenities
                              .slice(0, 3)
                              .map((amenity, index) => (
                                <span
                                  key={index}
                                  className="badge bg-info me-1"
                                >
                                  {amenity}
                                </span>
                              ))}
                            {hotel.amenities.length > 3 && (
                              <span>
                                ...{" "}
                                <Link to={`/hoteldetail/${hotel._id}`}>
                                  More
                                </Link>
                              </span>
                            )}
                          </>
                        ) : (
                          "No amenities available"
                        )}
                      </p>

                      {/* ✅ Display only 3 facilities with title icon */}
                      <p>
                        <FaWifi style={{ color: "#28a745" }} />
                        <strong> Facilities: </strong>{" "}
                        {hotel.facilities && hotel.facilities.length > 0 ? (
                          <>
                            {hotel.facilities
                              .slice(0, 3)
                              .map((facility, index) => (
                                <span
                                  key={index}
                                  className="badge bg-success me-1"
                                >
                                  {facility}
                                </span>
                              ))}
                            {hotel.facilities.length > 3 && (
                              <span>
                                ...{" "}
                                <Link to={`/hoteldetail/${hotel._id}`}>
                                  More
                                </Link>
                              </span>
                            )}
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
                          </>
                        ) : (
                          "No facilities available"
                        )}
                      </p>
                    </div>

                    <div className="ps-3 ms-0 ms-md-auto hotelrightdiv">
                      <div className="stardes">
                        {[...Array(hotel.number_of_stars || 3)].map(
                          (_, index) => (
                            <FaStar key={index} style={{ color: "#FFD43B" }} />
                          )
                        )}
                      </div>
                      <s>&#x20B9; {hotel.real_price || "N/A"}</s>
                      <h4> &#x20B9; {hotel.discounted_price || "N/A"}</h4>
                      <p>+ &#x20B9; 0 taxes & fees per night</p>
                      <Link to={`/hoteldetail/${hotel._id}`}>
                        <button type="button" className="btn btn-success">
                          More Details
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Hotels Found.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default HotelPage;
