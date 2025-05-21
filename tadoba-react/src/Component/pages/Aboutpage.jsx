import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import ImportantLinks from "../ImportantLinks";
function Aboutpage() {
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
        const res = await axios.get("http://localhost:5001/api/pageseo/get-page-seo", {
          params: { path: "/about" },
        });

        if (res.data?.seo) setSeo(res.data.seo);
      } catch (error) {
        console.error("Failed to fetch SEO data", error);
      }
    };

    fetchSEO();
  }, []);
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
      <div>
        <img
          src="/images/about-banner.jpg"
          className="aboutUsBanner"
          alt="About Image banner"
        />
      </div>
      <section className="py-3 leaf">
        <div className="container">
          <h1>ABOUT US</h1>
          <p>
            When you wish you to experience the truest meanings of heavenly
            beauty and charm, knock the doors of India’s most trusted tour
            operator GTI Travels Pvt Ltd. Our website
            tadobanationalparkonline.in has a team of experts and one of the
            leading tour operator based in India, offering you multifarious tour
            packages including every corner of India. We have amassed the best
            tour packages so that you can explore every nook and cranny of
            Indian beauty without worrying about budget, convenience or anything
            else.
          </p>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="aboutUsBox">
                <h5>Our Mission</h5>
                <p>
                    We acknowledge of being the most modern and affordable travel
                    solutions where you can gain high quality, up-to-the-minute
                    services. The aim of our travel services can be put into a
                    simple fundamental that is simple, quicker and value for money.
                    We have amassed the best technological advancements and travel
                    expertise to carve out the best and the easiest to travel. Last
                    but not least, we have aimed to serve our global clients and
                    other enthusiasts to an easy access to the India’s panoramic
                    nature and its other natural beauties.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="aboutUsBox">
                    <h5>Our Excellence</h5>
                    <p>
                        We are the revolutionary entrepreneurs in the wildlife tourism
                        world in the terms of working, methods and services quality. We
                        invented and carved a platform where you can just enter and get
                        an access to travel India. We are the revolutionary
                        entrepreneurs in the wildlife tourism world in the terms of
                        working, methods and services quality. We invented and carved a
                        platform where you can just enter and get an access to travel
                        India.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </section>
      <ImportantLinks />
      <Footer />
    </>
  );
}

export default Aboutpage;
