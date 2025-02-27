import React from "react";
import { Link } from "react-router-dom";
import hotelBanner1 from "../../assets/images/hotel-banner1.jpg";
import hotelBanner2 from "../../assets/images/hotel-banner2.jpg";
import hotelBanner3 from "../../assets/images/hotel-banner3.jpg";
import tadobaHotel from "../../assets/images/caption.jpg";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { TiLocationArrow } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

function HotelPage() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header></Header>

      <div className="">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1">
            <img className="hotelBannerImg" src={hotelBanner1} alt="" />
          </div>
          <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1">
            <img className="hotelBannerImg" src={hotelBanner2} alt="" />
          </div>
          <div className="col-sm-12 col-md-4 col-md-4">
            <img className="hotelBannerImg" src={hotelBanner3} alt="" />
          </div>
        </div>
      </div>

      <div className="row hotelback hotelpagefilter">
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
      </div>
      <section className="leaf">
        <div className="container">
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
                    <p>
                      <input type="checkbox" className="me-2" />
                      Lawn
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
              {/* <p>5 Hotels Found</p> */}
              <div className="hotel mt-3 allhoteldes">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    <Link to="/hoteldetail"> Tiger Valley Resort, Tadoba</Link>{" "}
                    
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Address: Tadoba National Park, Moharli Gate, Maharashtra
                    442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <TiLocationArrow />
                    <span>Location: </span>Near Chandrapur (Moharli Zone),
                    Nagpur
                  </p>
                </div>

                <div className="ps-3 ms-auto hotelrightdiv">
                    <div className="stardes">
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />{" "}
                    </div>
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 7650</s>
                  <h4> &#x20B9; 6579</h4>
                  <p>+ &#x20B9; 0 taxes & fees per night</p>
                  <Link to="/hoteldetail">
                    {" "}
                    <button type="button" className="btn btn-success">
                      More Room
                    </button>
                  </Link>
                </div>
              </div>

              <div className="hotel mt-3 allhoteldes">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    <Link to="/hoteldetail"> Tiger Valley Resort, Tadoba</Link>{" "}
                  
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Address: Tadoba National Park, Moharli Gate, Maharashtra
                    442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <TiLocationArrow />
                    <span>Location: </span>Near Chandrapur (Moharli Zone),
                    Nagpur
                  </p>
                </div>

                <div className="ps-3 ms-auto hotelrightdiv">
                    <div className="stardes">
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />{" "}
                    </div>
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 7650</s>
                  <h4> &#x20B9; 6579</h4>
                  <p>+ &#x20B9; 0 taxes & fees per night</p>
                  <Link to="/hoteldetail">
                    {" "}
                    <button type="button" className="btn btn-success">
                      More Room
                    </button>
                  </Link>
                </div>
              </div>

              <div className="hotel mt-3 allhoteldes">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    <Link to="/hoteldetail"> Tiger Valley Resort, Tadoba</Link>{" "}
                    
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Address: Tadoba National Park, Moharli Gate, Maharashtra
                    442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <TiLocationArrow />
                    <span>Location: </span>Near Chandrapur (Moharli Zone),
                    Nagpur
                  </p>
                </div>

                <div className="ps-3 ms-auto hotelrightdiv">
                    <div className="stardes">
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />{" "}
                    </div>
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 7650</s>
                  <h4> &#x20B9; 6579</h4>
                  <p>+ &#x20B9; 0 taxes & fees per night</p>
                  <Link to="/hoteldetail">
                    {" "}
                    <button type="button" className="btn btn-success">
                      More Room
                    </button>
                  </Link>
                </div>
              </div>

              <div className="hotel mt-3 allhoteldes">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    <Link to="/hoteldetail"> Tiger Valley Resort, Tadoba</Link>{" "}
                    
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Address: Tadoba National Park, Moharli Gate, Maharashtra
                    442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <TiLocationArrow />
                    <span>Location: </span>Near Chandrapur (Moharli Zone),
                    Nagpur
                  </p>
                </div>

                <div className="px-3 ms-auto hotelrightdiv">
                    <div className="stardes">
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />{" "}
                    </div>
                  <p>
                    <span>Excellent </span> <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 7650</s>
                  <h4> &#x20B9; 6579</h4>
                  <p>+ &#x20B9; 0 taxes & fees per night</p>
                  <Link to="/hoteldetail">
                    {" "}
                    <button type="button" className="btn btn-success">
                      More Room
                    </button>
                  </Link>
                </div>
              </div>

              <div className="hotel mt-3 allhoteldes">
                <div>
                  <img
                    src={tadobaHotel}
                    className="tadobahotelImg"
                    alt="Tadoba hotel iamge"
                  />
                </div>
                <div className="ps-4">
                  <h5>
                    <Link to="/hoteldetail"> Tiger Valley Resort, Tadoba</Link>{" "}
                    
                  </h5>
                  <p>
                    {" "}
                    <FaLocationDot />
                    Address: Tadoba National Park, Moharli Gate, Maharashtra
                    442404
                  </p>
                  <ul>
                    <li className="policy">Cancellation Policy</li>
                    <li className="policy">Breakfast Included</li>
                  </ul>
                  <p className="">
                    <TiLocationArrow />
                    <span>Location: </span>Near Chandrapur (Moharli Zone),
                    Nagpur
                  </p>
                </div>

                <div className="ps-3 ms-auto hotelrightdiv">
                    <div className="stardes">
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />
                      <FaStar style={{ color: "#FFD43B" }} />{" "}
                    </div>
                  <p>
                    <span>Excellent </span>
                    <br />
                    250 Review
                  </p>
                  <s>&#x20B9; 7650</s>
                  <h4> &#x20B9; 6579</h4>
                  <p>+ &#x20B9; 0 taxes & fees per night</p>
                  <Link to="/hoteldetail">
                    {" "}
                    <button type="button" className="btn btn-success">
                      More Room
                    </button>
                  </Link>
                </div>
              </div>
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
