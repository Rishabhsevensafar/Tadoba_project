import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import packageTour1 from "../assets/images/package tour.jpg";
import packageTour2 from "../assets/images/package tour2.jpg";
import packageTour3 from "../assets/images/package tour3.jpg";
import packageTour4 from "../assets/images/package tour4.jpg";
import tadobaHotel from "../assets/images/tadoba1.jpeg";

function TourPackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tourpackage");
      setPackages(response.data.packages);
    } catch (error) {
      console.error("Error fetching tour packages:", error);
    }
  };

  return (
    <div className="section tourPackage"
    style={{padding:'0px'}}
    >
      <div className="container">
        <h2 className="packageHeading"
        style={{padding:'0px'}}
        >More Tour Packages in Tadoba</h2>
        <div className="row">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg._id} className="col-lg-6 col-lg-6 col-sm-12">
                <div className="packagebox">
                  <img
                    src={
                      pkg.images?.length > 0
                        ? `http://localhost:5000${pkg.images}`
                        : tadobaHotel
                    }
                      className="packageImg"
                    alt="Hotel"
                  />
                  <div className="package">
                    <h3 className="headZones">{pkg.title}</h3>
                    <p>{pkg.duration}</p> {/* Fixed typo: was pkgs.duration */}
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
    </div>
  );
}

export default TourPackages;
