import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function SafariBooking() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header></Header>
      <section className="safaritable">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-7 col-lg-7">
              {/* <h2>Tadoba Jeep Safari Details</h2> */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "40px" }}>
                      Tickets Booking in 4-59 Days{" "}
                    </th>
                    <th scope="col" style={{ width: "30px" }}>
                      Monday to Friday{" "}
                    </th>
                    <th scope="col" style={{ width: "30px" }}>
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
                    <td>INR 13000</td>
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
                    <td colSpan={3}>Jeep Safari amounts is non refundable.</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      Welcome to the Tadoba National Park online safari booking
                      platform. Here, visitors can conveniently reserve Jeep
                      seats in advance through our online service. The entire
                      booking process for Tadoba Safari Jeeps is overseen and
                      managed by the park's forest officials. Safari tours are
                      available in both the core and buffer zones of the park in
                      the stipulated time slots mentioned above.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-sm-12 col-md-5 col-lg-5">
              <div>
                <div className="booking-des">
                  <h3>Tadoba National Park Booking</h3>
                  {/* <h4 className="text-xl font-bold mb-4">Select Date</h4> */}
                  <div className="">
                    <Calendar
                      onChange={setDate}
                      value={date}
                      className="border rounded-lg p-2 shadow-md calender react-calendar"
                    />
                  </div>
                </div>
                <div className="row calenderForm">
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className=" ">
                      <select name="" className="optionValue" id="">
                        <option value="">Select</option>
                        <option value="">Jeep</option>
                      </select>
                      <select name="" className="optionValue" id="">
                        <option value="">Select</option>
                        <option value="">6-10 AM/Morning</option>
                        <option value="">2-6 AM/Evening</option>
                      </select>

                      <select name="" className="optionValue" id="">
                        <option value="">Child (between 5 to 12 years)</option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                        <option value="">10</option>
                        <option value="">11</option>
                        <option value="">12</option>
                      </select>
                      <input
                        type="number"
                        name=""
                        id=""
                        className="optionValue"
                        placeholder="Enter Your Mobile"
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <select name="" className="optionValue" id="">
                      <option value="">Select</option>
                      <option value="">
                        Moharli/Mamla/Agarzari/Adegaon/Junona/Devada
                      </option>
                      <option value="">
                        Kolara/Alizanza/Madnapur/Palasgaon/Shirkheda Belara{" "}
                      </option>
                      <option value="">Navegaon/Ramdegi/Nimdela</option>
                      <option value="">
                        Kesalaghat/Pangadi/Pangadi Aswal Chuha/Zari Peth
                      </option>
                    </select>
                    <select name="" className="optionValue" id="">
                      <option value="">Adult (above 8 years)</option>
                      <option value="">1</option>
                      <option value="">2</option>
                      <option value="">3</option>
                      <option value="">4</option>
                      <option value="">5</option>
                      <option value="">6</option>
                      <option value="">7</option>
                      <option value="">8</option>
                    </select>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="optionValue"
                      placeholder="Enter Your Name"
                    />
                    <input
                      type="email"
                      name=""
                      id=""
                      className="optionValue"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <Link to="/travellerdetail">
                    <button className="btnbooking">
                      <span>Book Now</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default SafariBooking;
