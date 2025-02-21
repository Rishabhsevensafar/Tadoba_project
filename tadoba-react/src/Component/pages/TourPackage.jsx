import React from "react";
import ImportantLinks from "../ImportantLinks";
import Header from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import { useEffect } from "react";
import tourPckages from "../../assets/images/tour-Packages.jpg";
import tourPckages2 from "../../assets/images/tour-Packages2.jpg";
import tourPckages3 from "../../assets/images/tour-Packages3.jpg";
import pkg from "../../assets/pkg1.jpg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
function TourPackage() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const packages = [
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
    {
      image: pkg,
      title: "Tadoba Weekend Tour - 1 Night and 2 Days",
      description:
        "Lush green Tadoba is no less than heaven on earth. The real highlight of Tadoba National Park",
    },
  ];
  return (
    <>
      <Header></Header>
      <div>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4">
            <img
              src={tourPckages}
              className="tourPackageImg pe-lg-1"
              alt="Tour Packages "
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <img
              src={tourPckages2}
              className="tourPackageImg pe-lg-1"
              alt="Tour Packages "
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4">
            <img
              src={tourPckages3}
              className="tourPackageImg"
              alt="Tour Packages "
            />
          </div>
        </div>
      </div>

      <div className="row hotelback ">
        <div className="col-sm-12 col-md-3 col-lg-3 px-4 ">
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
        <div className="col-sm-12 col-md-3 col-lg-3 px-4">
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
        <div className="col-sm-12 col-md-2 col-lg-2 px-4">
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
        <div className="col-sm-12 col-md-2 col-lg-2 px-4">
          <div className="boxx ">
            <select>
              <option value="">Select</option>
              <option value="">Indian</option>
              <option value="">Foreigner</option>
            </select>
            <p>All Hotels in tadoba</p>
          </div>
        </div>{" "}
        <div className="col-sm-12 col-md-2 col-lg-2  px-4">
          <div className="boxxSearch">
            <p>Search</p>
          </div>
        </div>{" "}
      </div>

      <section className="packagelisting  leaf">
        <div className="container">
          <div className="row">
            {packages.map((packages) => (
            <div className="col-sm-12 col-md-3 col-lg-3">
                <div className="tourPackage1">
                  <img src={packages.image} className="tourPackage2" alt="" />
                  <div className="tourOverlay">
                    <h4>{packages.title}</h4>
                    <p>{packages.description}</p>
                    <Link to="/tourpackagedetail">
                      {" "}
                      <button type="button" class="packageButton">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
            </div>
            ))}
          </div>
        </div>
      </section>


      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default TourPackage;
