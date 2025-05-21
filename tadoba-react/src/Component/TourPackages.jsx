import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import tadobaHotel from "../assets/images/tadoba1.jpeg";
import "../styles/TourPackagesHome.css"; // ✅ Import custom CSS

function TourPackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/tourpackage");
      setPackages(response.data.packages.slice(0, 4)); // ✅ Limit to 4 packages
    } catch (error) {
      console.error("Error fetching tour packages:", error);
    }
  };

  return (
    <section className="tour-packages-section">
      <div className="container">
        <h2 className="tour-packages-title">Top Tour Packages in Tadoba</h2>
        <div className="tour-packages-grid">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg._id} className="tour-package-card">
                <div className="tour-package-image">
                  <img
                    src={
                      pkg.images?.length > 0
                        ? `http://localhost:5001/uploads/packages/${pkg.images[0]}`
                        : tadobaHotel
                    }
                    alt={pkg.title}
                  />
                </div>
                <div className="tour-package-details">
                  <h3 className="tour-package-name">{pkg.title}</h3>
                  <p className="tour-package-duration">{pkg.duration}</p>
                  <p className="tour-package-desc">
                    {pkg.description.length > 120
                      ? `${pkg.description.slice(0, 120)}...`
                      : pkg.description}
                  </p>
                  <Link to={`/tourpackagedetail/${pkg._id}`} className="tour-package-link">
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-packages-msg">No packages available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default TourPackages;
