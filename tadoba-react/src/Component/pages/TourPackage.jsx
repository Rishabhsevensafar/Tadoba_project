import React from "react";
import ImportantLinks from "../ImportantLinks";
import axios from "axios"; // ✅ Import axios
import Header from "../Header";
import Footer from "../Footer";
import { useState } from "react";
import { useEffect } from "react";
import tourPckages from "../../assets/images/tour-Packages.jpg";
import tourPckages2 from "../../assets/images/tour-Packages2.jpg";
import tourPckages3 from "../../assets/images/tour-Packages3.jpg";
import pkg from "../../assets/pkg1.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
function TourPackage() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages(); // ✅ Call the function to fetch data
  }, []);
  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tourpackage");
      setPackages(response.data.packages); // Set fetched packages
    } catch (error) {
      console.error("Error fetching tour packages:", error);
    }
  };

  return (
    <>
      <Header></Header>
      <div>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4 p-0">
            <img
              src={tourPckages}
              className="tourPackageImg pe-lg-1"
              alt="Tour Packages "
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 p-0">
            <img
              src={tourPckages2}
              className="tourPackageImg pe-lg-1"
              alt="Tour Packages "
            />
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 p-0">
            <img
              src={tourPckages3}
              className="tourPackageImg"
              alt="Tour Packages "
            />
          </div>
        </div>
      </div>
      <div className="row hotelback ">
        <div className="col-sm-12 col-md-3 col-lg-3 px-2">
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
        <div className="col-sm-12 col-md-2 col-lg-2 px-2">
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
        <div className="col-sm-12 col-md-2 col-lg-2 px-2">
          <div className="boxx ">
            <select>
              <option value="">Select</option>
              <option value="">Indian</option>
              <option value="">Foreigner</option>
            </select>
            <p>All Hotels in tadoba</p>
          </div>
        </div>{" "}
        <div className="col-sm-12 col-md-2 col-lg-2  px-2">
          <button className="boxxSearch">Search</button>
        </div>{" "}
      </div>
      <section className="packagelisting leaf">
        <div className="container">
          <div className="row">
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <div key={pkg._id} className="col-sm-12 col-md-3 col-lg-3">
                  <div className="tourPackage1">
                    <img
                      src={tourPckages2}
                      className="tourPackage2"
                      alt={pkg.title}
                    />
                    <div className="tourOverlay">
                      <h6>{pkg.title}</h6>
                      <p>
                        {pkg.description.length > 150
                          ? `${pkg.description.slice(0, 150)}...`
                          : pkg.description}
                      </p>
                      <Link to={`/tourpackagedetail/${pkg._id}`}>
                        <button type="button" className="btn">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No packages available.</p>
            )}
          </div>
        </div>
      </section>

      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default TourPackage;
