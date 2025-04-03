import React from "react";
import Slider from "react-slick";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function TourPackage() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [packages, setPackages] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  
  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tourpackage");
      setPackages(response.data.packages); // Set fetched packages
    } catch (error) {
      console.error("Error fetching tour packages:", error);
    }
  };
  // Slider settings
  const sliderSettings = {
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
      <div>
      <div>
        {isMobile ? (
          <Slider {...sliderSettings}>
            <div>
              <img src={tourPckages} className="tourPackageImg" alt="Tour Package 1" />
            </div>
            <div>
              <img src={tourPckages2} className="tourPackageImg" alt="Tour Package 2" />
            </div>
            <div>
              <img src={tourPckages3} className="tourPackageImg" alt="Tour Package 3" />
            </div>
          </Slider>
        ) : (
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4 p-0">
              <img src={tourPckages} className="tourPackageImg pe-lg-1" alt="Tour Package 1" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 p-0">
              <img src={tourPckages2} className="tourPackageImg pe-lg-1" alt="Tour Package 2" />
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4 p-0">
              <img src={tourPckages3} className="tourPackageImg" alt="Tour Package 3" />
            </div>
          </div>
        )}
      </div>
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
