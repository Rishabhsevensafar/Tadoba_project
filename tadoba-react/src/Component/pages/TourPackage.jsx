import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ImportantLinks from "../ImportantLinks";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../styles/TourPackage.css";
import {Helmet} from "react-helmet";

import banner1 from "../../assets/images/tour-Packages.jpg";
import banner2 from "../../assets/images/tour-Packages2.jpg";

function TourPackage() {
  const [packages, setPackages] = useState([]);
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
              params: { path: "/tourpackage" },
            }
          );
  
          if (res.data?.seo) setSeo(res.data.seo);
        } catch (error) {
          console.error("Failed to fetch SEO data", error);
        }
      };
  
      fetchSEO();
    }, []);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/tourpackage");
      setPackages(response.data.packages);
    } catch (error) {
      console.error("Error fetching tour packages:", error);
    }
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
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        {seo.noIndex && <meta name="robots" content="noindex, nofollow" />}
      </Helmet>
      <Header />

      {/* Hero Banner with Text Overlay */}
      <section className="hero-banner">
        <div className="banner-image">
          <img src="/images/fomg-bg.jpg" alt="Tadoba Safari Tours" />
          <div className="banner-overlay">
            <h1>Tadoba Safari Tour and Packages</h1>
            <p>
              Wildlife tour packages offered by us are meant for a memorable
              vacation in Tadoba Safari. For every wildlife lover, we have
              recommendations based on their interest and preference. So don't
              just sit back and take a look at some of the best travel packages
              listed below
            </p>
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section className="tour-section">
        <div className="container">
          <h2 className="tours-found">{packages.length} Tours Found</h2>

          <div className="tour-grid">
            {packages.length > 0 ? (
              packages.map((pkg, i) => (
                <div
                  key={pkg._id}
                  className="tour-card"
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-offset="100"
                  data-aos-delay={i * 100}
                >
                  <div className="tour-image-container">
                    <img
                      src={
                        pkg.images && pkg.images.length > 0
                          ? `http://localhost:5001/uploads/packages/${pkg.images[0]}`
                          : banner2
                      }
                      alt={pkg.title}
                      className="tour-image"
                    />
                    <div className="tour-label">
                      <span>{i + 1}</span>
                    </div>
                  </div>

                  <div className="tour-content">
                    <h3 className="tour-title">{pkg.title}</h3>

                    <div className="tour-duration-badge">
                      <span>{pkg.duration || "1 Night/2 Days"}</span>
                    </div>

                    <p className="tour-desc">
                      {pkg.description.length > 200
                        ? pkg.description.slice(0, 400) + "..."
                        : pkg.description}
                    </p>

                    <Link
                      to={`/tourpackagedetail/${pkg._id}`}
                      className="view-details-link"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-packages">
                No tour packages available at the moment.
              </p>
            )}
          </div>
        </div>
      </section>

      <ImportantLinks />
      <Footer />
    </>
  );
}

export default TourPackage;
