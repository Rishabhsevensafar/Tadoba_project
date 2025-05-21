import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/SafariBooking.css";
import {Helmet} from "react-helmet";
import axios from "axios";

function SafariBooking() {
  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingConfig, setBookingConfig] = useState({
    cutOffTime: "17:00", // Default cut-off time (5:00 PM in 24-hour format)
    blockedDates: [], // Array of dates when booking is blocked
  });
  const [isAfterCutOff, setIsAfterCutOff] = useState(false);
  const [isDateBlocked, setIsDateBlocked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    safariZone: "",
    vehicleType: ["Jeep", "Canter"],
    safariTime: ["Morning", "Evening"],
    children: 0,
    adults: 1,
    amountPaid: 6100,
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBookingConfig();
  }, []);
  
    const [seo, setSeo] = useState({
      metaTitle: "About Us | Your Site",
      metaDescription: "",
      metaKeywords: "",
      canonicalUrl: "",
      noIndex: false,
    });
  
    useEffect(() => {
      const fetchSEO = async () => {
        try {
          const res = await axios.get(
            "http://localhost:5001/api/pageseo/get-page-seo",
            {
              params: { path: "/safari-booking" },
            }
          );
  
          if (res.data?.seo) setSeo(res.data.seo);
        } catch (error) {
          console.error("Failed to fetch SEO data", error);
        }
      };
  
      fetchSEO();
    }, []);
  // Fetch booking configuration from backend
  const fetchBookingConfig = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/safaridate/config"
      );
      const data = await response.json();
      if (response.ok) {
        setBookingConfig(data);
      }
    } catch (error) {
      console.error("Error fetching booking config:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const calendarGrid = [];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    calendarGrid.push(weekdays);
    const startingDay = firstDay.getDay();
    const initialPadding = Array(startingDay).fill(null);
    const monthDays = Array.from(
      { length: lastDay.getDate() },
      (_, i) => i + 1
    );
    const fullGrid = [...initialPadding, ...monthDays];
    for (let i = 0; i < fullGrid.length; i += 7) {
      calendarGrid.push(fullGrid.slice(i, i + 7));
    }
    return calendarGrid;
  };

  const handleDateSelect = (day) => {
    if (day) {
      const selectedFullDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedFullDate >= today) {
        setSelectedDate(selectedFullDate);

        // Check if selected date is blocked
        const isBlocked = bookingConfig.blockedDates.some((blockedDate) => {
          const blockedDateObj = new Date(blockedDate);
          return (
            blockedDateObj.getFullYear() === selectedFullDate.getFullYear() &&
            blockedDateObj.getMonth() === selectedFullDate.getMonth() &&
            blockedDateObj.getDate() === selectedFullDate.getDate()
          );
        });
        setIsDateBlocked(isBlocked);

        // Check if current time is after cut-off for today's date
        if (selectedFullDate.toDateString() === today.toDateString()) {
          checkCutOffTime();
        } else {
          setIsAfterCutOff(false);
        }
      }
    }
  };

  // Check if current time is after cut-off time
  const checkCutOffTime = () => {
    const now = new Date();
    const [cutOffHour, cutOffMinute] = bookingConfig.cutOffTime
      .split(":")
      .map(Number);
    const cutOffTime = new Date();
    cutOffTime.setHours(cutOffHour, cutOffMinute, 0, 0);

    setIsAfterCutOff(now > cutOffTime);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const calendarGrid = generateCalendarGrid();

  const handleBooking = async () => {
    try {
      if (!selectedDate) {
        alert("Please select a date for your safari");
        return;
      }

      if (isAfterCutOff) {
        alert(
          `Booking is closed for today. The last time for booking was ${bookingConfig.cutOffTime}.`
        );
        return;
      }

      if (isDateBlocked) {
        alert("Booking is not available for the selected date.");
        return;
      }

      const payload = { ...formData, date: selectedDate.toISOString() };
      console.log("Sending booking request with data:", payload);

      const response = await fetch("http://localhost:5001/api/booking/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (response.ok && data.booking) {
        localStorage.setItem("booking", JSON.stringify(data.booking));
        navigate(`/travellerdetail`, { state: { booking: data.booking } });
      } else {
        alert(data.error || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  const handleEnquiry = async () => {
    try {
      if (!selectedDate) {
        alert("Please select a date for your safari");
        return;
      }

      if (isAfterCutOff) {
        alert(
          `Enquiry is closed for today. The last time for enquiry was ${bookingConfig.cutOffTime}.`
        );
        return;
      }

      if (isDateBlocked) {
        alert("Enquiry is not available for the selected date.");
        return;
      }

      let enquiryData = {
        ...formData,
        date: selectedDate.toISOString(),
      };

      enquiryData = Object.fromEntries(
        Object.entries(enquiryData).filter(
          ([key, value]) => key.trim() !== "" && value !== ""
        )
      );

      const response = await fetch(
        "http://localhost:5001/api/safarienquiry/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enquiryData),
        }
      );

      const data = await response.json();
      console.log("Enquiry Response:", data);

      if (response.ok) {
        alert("Enquiry submitted successfully! Admin will contact you soon.");
      } else {
        alert(data.error || "Failed to submit enquiry.");
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
    }
  };
  // Custom calendar tile class to disable past dates
  const tileClassName = ({ date: tileDate, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let classes = [];

    if (view === "month") {
      if (tileDate < today) {
        classes.push("disabled-date");
      }

      // Check if date is blocked
      const isBlocked = bookingConfig.blockedDates.some((blockedDate) => {
        const blockedDateObj = new Date(blockedDate);
        return (
          blockedDateObj.getFullYear() === tileDate.getFullYear() &&
          blockedDateObj.getMonth() === tileDate.getMonth() &&
          blockedDateObj.getDate() === tileDate.getDate()
        );
      });

      if (isBlocked) {
        classes.push("blocked-date");
      }
    }

    return classes.join(" ");
  };
  // Disable past dates in calendar
  const tileDisabled = ({ date: tileDate, view }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return view === "month" && tileDate < today;
  };

  return (

    <>
      <Helmet>
        <title>{seo.metaTitle}</title>
        {seo.metaDescription && (
          <meta name="description" content={seo.metaDescription} />
        )}
        {seo.metaKeywords && (
          <meta name="keywords" content={seo.metaKeywords} />
        )}
        {seo.canonicalUrl && (
          <link rel="canonical" href={seo.canonicalUrl} />
        )}
        {seo.noIndex && <meta name="robots" content="noindex, nofollow" />}
      </Helmet>
      <Header />

      {/* Main Booking Section */}
      <section className="booking-section">
        <div className="container">
          <div className="booking-grid">
            {/* Booking Form (Right Side) */}
            <div className="d-block d-md-none booking-form-container">
              <div className="booking-card">
                <h3 className="booking-title">
                  <i className="fas fa-calendar-alt"></i> Tadoba National Park
                  Booking
                </h3>
                {/* Cut-off time notification */}
                {isAfterCutOff && (
                  <div className="alert alert-warning">
                    <i className="fas fa-exclamation-triangle"></i>{" "}
                    Booking/Enquiry is closed for today. The last time for
                    booking/enquiry was {bookingConfig.cutOffTime}.
                  </div>
                )}

                {/* Blocked date notification */}
                {isDateBlocked && (
                  <div className="alert alert-danger">
                    <i className="fas fa-ban"></i> Safari is not available on
                    the selected date.
                  </div>
                )}

                <div className="custom-safari-calendar">
                  <div className="calendar-header">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="nav-button"
                    >
                      ◀️
                    </button>
                    <h3>
                      {currentDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <button
                      onClick={() => changeMonth(1)}
                      className="nav-button"
                    >
                      ▶️
                    </button>
                  </div>
                  <table className="calendar-table">
                    <thead>
                      <tr>
                        {calendarGrid[0].map((day) => (
                          <th key={day} className="weekday-header">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {calendarGrid.slice(1).map((week, weekIndex) => (
                        <tr key={weekIndex}>
                          {week.map((day, dayIndex) => {
                            const isToday =
                              day &&
                              new Date().toDateString() ===
                                new Date(
                                  currentDate.getFullYear(),
                                  currentDate.getMonth(),
                                  day
                                ).toDateString();

                            const isPastDate =
                              day &&
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day
                              ) < new Date().setHours(0, 0, 0, 0);

                            const isSelected =
                              selectedDate &&
                              selectedDate.getFullYear() ===
                                currentDate.getFullYear() &&
                              selectedDate.getMonth() ===
                                currentDate.getMonth() &&
                              selectedDate.getDate() === day;

                            return (
                              <td
                                key={dayIndex}
                                className={`calendar-day 
                      ${isToday ? "today" : ""} 
                      ${isPastDate ? "past-date" : ""} 
                      ${isSelected ? "selected-date" : ""}
                      ${day ? "active-date" : "empty-date"}`}
                                onClick={() => handleDateSelect(day)}
                              >
                                {day || ""}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedDate && (
                    <div className="selected-date-info">
                      Selected Date: {selectedDate.toLocaleDateString()}
                      {isDateBlocked && (
                        <div className="blocked-date-warning">
                          <i className="fas fa-exclamation-triangle"></i>
                          Safari is not available on this date. Please select
                          another date.
                        </div>
                      )}
                      {isAfterCutOff && (
                        <div className="cutoff-warning">
                          <i className="fas fa-clock"></i>
                          Bookings/Enquiries are closed for today. The cut-off
                          time was {bookingConfig.cutOffTime}.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Safari Booking Form */}
                <div className="safari-form">
                  <div className="form-grid">
                    {/* Left Column */}
                    <div className="form-column">
                      <div className="form-group">
                        {/* <label htmlFor="safariZone">Safari Zone</label> */}
                        <select
                          name="safariZone"
                          id="safariZone"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Zone</option>
                          <option value="Moharli/Mamla/Agarzari/Adegaon/Junona/Devada">
                            Moharli/Mamla/Agarzari/Adegaon/Junona/Devada
                          </option>
                          <option value="Kolara/Alizanza/Madnapur/Palasgaon/Shirkheda Belara">
                            Kolara/Alizanza/Madnapur/Palasgaon/Shirkheda Belara
                          </option>
                          <option value="Navegaon/Ramdegi/Nimdela">
                            Navegaon/Ramdegi/Nimdela
                          </option>
                          <option value="Kesalaghat/Pangadi/Pangadi Aswal Chuha/Zari Peth">
                            Kesalaghat/Pangadi/Pangadi Aswal Chuha/Zari Peth
                          </option>
                        </select>
                      </div>

                      <div className="form-group">
                        {/* <label htmlFor="vehicleType">Vehicle Type</label> */}
                        <select
                          name="vehicleType"
                          id="vehicleType"
                          onChange={handleChange}
                        >
                          <option value="Jeep">Jeep</option>
                          <option value="Canter">Canter</option>
                        </select>
                      </div>

                      <div className="form-group">
                        {/* <label htmlFor="safariTime">Safari Time</label> */}
                        <select
                          name="safariTime"
                          id="safariTime"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Time</option>
                          <option value="Morning">Morning</option>
                          <option value="Evening">Evening</option>
                        </select>
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="name">Full Name</label> */}
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your full name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="form-column">
                      <div className="form-group">
                        {/* <label htmlFor="adults">Adults</label> */}
                        <select
                          name="adults"
                          id="adults"
                          onChange={handleChange}
                        >
                          {[...Array(8)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        {/* <label htmlFor="children">Children</label> */}
                        <select
                          name="children"
                          id="children"
                          onChange={handleChange}
                        >
                          <option value="0">No Child</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="email">Email Address</label> */}
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="phone">Phone Number</label> */}
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder="Enter your mobile number"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="action-buttons">
                    {/* <button className="btn-book-now" onClick={handleBooking}>
                      <i className="fas fa-check-circle"></i> Book Now
                    </button> */}
                    <button
                      className="btn-enquiry"
                      onClick={handleEnquiry}
                      disabled={isAfterCutOff || isDateBlocked}
                    >
                      <i className="fas fa-question-circle"></i> Enquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Safari Information Table (Left Side - Desktop) */}
            <div className="safari-info-container">
              <h2 className="section-title">Tadoba Jeep Safari Details</h2>
              <div className="pricing-table">
                {/* <h2>Tadoba Jeep Safari Details</h2> */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "73px", color: "white" }}>
                        Tickets Booking in 4-59 Days{" "}
                      </th>
                      <th scope="col" style={{ width: "30px", color: "white" }}>
                        Monday to Friday{" "}
                      </th>
                      <th scope="col" style={{ width: "30px", color: "white" }}>
                        Saturday & Sundays
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Amount</td>
                      <td>INR 6100 </td>
                      <td>INR 7100 </td>
                    </tr>
                    <tr>
                      <td>Tickets Booking in 60-120 Days </td>
                      <td>Monday to Friday </td>
                      <td>Saturday & Sundays</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>INR 9000 </td>
                      <td>INR 10000</td>
                    </tr>
                    <tr>
                      <td>Tickets Booking in 01-03 Days (Tatkal) </td>
                      <td> Monday to Sunday </td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>INR 10000</td>
                      <td>N/A</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        Safari Booking will be CLOSED after 5:00 PM for Next Day
                        booking.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        All Core Gates are CLOSED on every Tuesday.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        All Buffer Gates are CLOSED on every Wednesday.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        M,E,N in above table stands for Morning, Evening, Night
                        respectively.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        Tatkal Booking is available for Core gates only 3 days
                        Prior to Safari.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Terms and Conditions:</td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        The visitors for safari are not allowed to extend the
                        passengers as they will not get the entry in the park.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        Jeep Safari amounts is non refundable.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        Welcome to the Tadoba National Park online safari
                        booking platform. Here, visitors can conveniently
                        reserve Jeep seats in advance through our online
                        service. The entire booking process for Tadoba Safari
                        Jeeps is overseen and managed by the park's forest
                        officials. Safari tours are available in both the core
                        and buffer zones of the park in the stipulated time
                        slots mentioned above.
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        Welcome to the Tadoba National Park online safari
                        booking platform. Here, visitors can conveniently
                        reserve Jeep seats in advance through our online
                        service. The entire booking process for Tadoba Safari
                        Jeeps is overseen and managed by the park's forest
                        officials. Safari tours are available in both the core
                        and buffer zones of the park in the stipulated time
                        slots mentioned above.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Booking Form (Right Side) */}
            <div className="d-none d-md-block booking-form-container">
              <div className="booking-card">
                <h3 className="booking-title">
                  <i className="fas fa-calendar-alt"></i> Tadoba National Park
                  Booking
                </h3>

                <div className="custom-safari-calendar">
                  <div className="calendar-header">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="nav-button"
                    >
                      ◀️
                    </button>
                    <h3>
                      {currentDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h3>
                    <button
                      onClick={() => changeMonth(1)}
                      className="nav-button"
                    >
                      ▶️
                    </button>
                  </div>
                  <table className="calendar-table">
                    <thead>
                      <tr>
                        {calendarGrid[0].map((day) => (
                          <th key={day} className="weekday-header">
                            {day}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {calendarGrid.slice(1).map((week, weekIndex) => (
                        <tr key={weekIndex}>
                          {week.map((day, dayIndex) => {
                            const isToday =
                              day &&
                              new Date().toDateString() ===
                                new Date(
                                  currentDate.getFullYear(),
                                  currentDate.getMonth(),
                                  day
                                ).toDateString();

                            const isPastDate =
                              day &&
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day
                              ) < new Date().setHours(0, 0, 0, 0);

                            const isSelected =
                              selectedDate &&
                              selectedDate.getFullYear() ===
                                currentDate.getFullYear() &&
                              selectedDate.getMonth() ===
                                currentDate.getMonth() &&
                              selectedDate.getDate() === day;

                            return (
                              <td
                                key={dayIndex}
                                className={`calendar-day 
                      ${isToday ? "today" : ""} 
                      ${isPastDate ? "past-date" : ""} 
                      ${isSelected ? "selected-date" : ""}
                      ${day ? "active-date" : "empty-date"}`}
                                onClick={() => handleDateSelect(day)}
                              >
                                {day || ""}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {selectedDate && (
                    <div className="selected-date-info">
                      {selectedDate && (
                        <div className="selected-date-info">
                          Selected Date: {selectedDate.toLocaleDateString()}
                          {isDateBlocked && (
                            <div className="blocked-date-warning">
                              <i className="fas fa-exclamation-triangle"></i>
                              Safari is not available on this date. Please
                              select another date.
                            </div>
                          )}
                          {isAfterCutOff && (
                            <div className="cutoff-warning">
                              <i className="fas fa-clock"></i>
                              Bookings/Enquiries are closed for today. The
                              cut-off time was {bookingConfig.cutOffTime}.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Safari Booking Form */}
                <div className="safari-form">
                  <div className="form-grid">
                    {/* Left Column */}
                    <div className="form-column">
                      <div className="form-group">
                        {/* <label htmlFor="safariZone">Safari Zone</label> */}
                        <select
                          name="safariZone"
                          id="safariZone"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Zone</option>
                          <option value="Moharli/Mamla/Agarzari/Adegaon/Junona/Devada">
                            Moharli/Mamla/Agarzari/Adegaon/Junona/Devada
                          </option>
                          <option value="Kolara/Alizanza/Madnapur/Palasgaon/Shirkheda Belara">
                            Kolara/Alizanza/Madnapur/Palasgaon/Shirkheda Belara
                          </option>
                          <option value="Navegaon/Ramdegi/Nimdela">
                            Navegaon/Ramdegi/Nimdela
                          </option>
                          <option value="Kesalaghat/Pangadi/Pangadi Aswal Chuha/Zari Peth">
                            Kesalaghat/Pangadi/Pangadi Aswal Chuha/Zari Peth
                          </option>
                        </select>
                      </div>

                      <div className="form-group">
                        {/* <label htmlFor="vehicleType">Vehicle Type</label> */}
                        <select
                          name="vehicleType"
                          id="vehicleType"
                          onChange={handleChange}
                        >
                          <option value="">Select Velhical</option>
                          <option value="Jeep">Jeep</option>
                          <option value="Canter">Canter</option>
                        </select>
                      </div>

                      <div className="form-group">
                        {/* <label htmlFor="safariTime">Safari Time</label> */}
                        <select
                          name="safariTime"
                          id="safariTime"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Time</option>
                          <option value="Morning">Morning</option>
                          <option value="Evening">Evening</option>
                        </select>
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="name">Full Name</label> */}
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your full name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="form-column">
                      <div className="form-group">
                        {/* <label htmlFor="adults">Adults</label> */}
                        <select
                          name="adults"
                          id="adults"
                          onChange={handleChange}
                        >
                          {[...Array(8)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        {/* <label htmlFor="children">Children</label> */}
                        <select
                          name="children"
                          id="children"
                          onChange={handleChange}
                        >
                          <option value="0">No Child</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="email">Email Address</label> */}
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        {/* <label htmlFor="phone">Phone Number</label> */}
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder="Enter your mobile number"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  {!selectedDate && (
                    <p className="error-message">
                      Please select a date for your safari
                    </p>
                  )}
                  <div className="action-buttons d-flex ">
                    {/* <button className="btn-book-now" onClick={handleBooking}>
                      <i className="fas fa-check-circle"></i> Book Now
                    </button> */}

                    <button
                      className="btn-enquiry"
                      onClick={handleEnquiry}
                      disabled={isAfterCutOff || isDateBlocked}
                    >
                      <i className="fas fa-question-circle"></i> Enquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="pt-2 pb-4 leaf">
        <div className="container">
          <h3>Tadoba Online Jeep Safari Booking</h3>
          <p className="mx-2">
            Embarking on a Jeep Safari in Tadoba National Park offers an
            unparalleled experience for those with a passion for exploration.
            The journey through the dense reserve is exceptionally rewarding,
            with the likelihood of spotting tigers and other wild animals being
            notably higher compared to other regions. For tourists, the tiger
            safari in Tadoba is essential, providing opportunities to observe
            tigers, leopards, sloth bears, wild dogs, panthers, barking deer,
            wolves, and more. The diverse flora and fauna encountered during
            these wildlife excursions ensure a rich and fulfilling experience.
            The open jeep safari allows for an immersive view of the forest's
            depths, accommodating up to six people, along with a guide and
            driver. The safety of all participants—whether they are families,
            photographers, wildlife enthusiasts, or other tourists - is a top
            priority, ensuring a secure and enjoyable adventure.
          </p>
          <p className="mx-2">
            For booking a jeep safari in Tadoba, it is advisable to make an
            online reservation in advance. We strongly recommend online booking
            to avoid any last-minute inconveniences. However, if you are unable
            to book online, you may contact us directly for assistance.
          </p>
          <p className="mx-2">
            Best Time to Visit in Tadoba - Given the tropical climate of Tadoba
            National Park, the period from March to May, particularly in May, is
            considered the optimal time for tiger sightings, as the summer heat
            is at its peak. The monsoon season spans from June to September when
            the national park is partially closed. October to November is also a
            favorable time to visit, as the park's greenery is at its most
            vibrant. December to February is another popular period, as the
            weather remains pleasant. You can choose the timing of your visit
            based on your preferred wildlife experience.
          </p>
          <h3>Route Chart Tadoba</h3>
          <div className="routeChart">
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Nagpur to Moharli Gate - 180 km</h6>
                <p>Via Chandrapur - Nagpur Rd/Mancherial</p>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Chandrapur to Kolara Gate - 180 km</h6>
                <p>Via Chimur</p>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Nagpur to Khutwanda Gate - 180 km</h6>
                <p>Via Chandrapur - Nagpur Rd/Mancherial</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Chandrapur to Moharli Gate - 180 km</h6>
                <p>Via Durgapur Road</p>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Nagpur to Kolara Gate - 180 km</h6>
                <p>Via Umred, Bhisi, Chimur</p>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Nagpur to Pangadi Gate - 180 km</h6>
                <p>Via Chandrapur - Nagpur Rd/Mancherial</p>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Chandrapur to Navegaon Gate - 180 km</h6>
                <p>Need not to go Chimur</p>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Nagpur to Navegaon Gate - 180 km</h6>
                <p>Via Chandrapur</p>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <h6>Nagpur to Zari Gate - 180 km</h6>
                <p>Via Ghat Rd and Rambagh Rd</p>
              </div>
            </div>
          </div>{" "}
          <div className="jeepSafari">
            <div>
              <h5>Important Information about Jeep Safari in Tadoba</h5>
              <ul className="mt-3">
                <li>Choose the gate for safari as per your accommodation.</li>
                <li>
                  Book your permit through the gates which are close to your
                  resort.
                </li>
                <li>
                  All the buffer gates will be closed on Wednesday from Feb 1
                </li>
                <li>
                  Visitors are required to get hands on entry permits that are
                  being subjected to receive online (by producing above
                  mentioned documents)
                </li>
                <li>
                  The entry permit to the Tadoba National Park is provisional
                  and can be changed or cancelled without any prior information.
                </li>
                <li>
                  The rules are made by Tadoba Tiger Reserve Director and we
                  have to follow the guidelines.
                </li>
                <li>
                  Registered guides are pre-decided so please do not make a
                  change in the guide or naturalist.
                </li>
              </ul>
            </div>
            <div>
              <h5>Online Jeep Safari Booking Procedure</h5>
              <ul className="mt-3">
                <li>
                  The full name, age, sex of each visitor as printed same on the
                  identity cards to be provided along with the confirmatory
                  amount
                </li>
                <li>Safari timing in (Morning/Afternoon)</li>
                <li>
                  Specific ID card number of your ( Voter Id, Aaadhar No,
                  Driving license No etc)
                </li>
                <li>Safari Entry fee should be paid in advance</li>
                <li>Jeep Safari & Canter Safari amounts are non refundable.</li>
                <li>
                  All visitors to the Tadoba National Park have to follow the
                  rules and regulations.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ImportantLinks />
      <Footer />
    </>
  );
}

export default SafariBooking;
