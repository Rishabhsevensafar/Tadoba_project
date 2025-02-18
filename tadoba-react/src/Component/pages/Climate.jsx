import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import { useEffect } from "react";
import climateBanner from "../../assets/images/climate-banner.jpg";
import climate1 from "../../assets/images/climate1.jpg";
import climate2 from "../../assets/images/climate2.jpg";
import climate3 from "../../assets/images/climate3.jpg";

function Climate() {
     useEffect(()=>{
          window.scrollTo(0, 0);
        },[])
  return (
    <>
      <Header></Header>
      <div>
        <img
          className="refundBanner"
          src={climateBanner}
          alt="refund banner image"
        />
      </div>
      <section className="pb-4 leaf">
        {" "}
        <div className="container">
            <div>
                <h1>TADOBA CLIMATE AND WEATHER</h1>
                <p>
                Winter is the absolutely wonderful from November to February.
                Temperature is between 25 Degree Celsius to 30 Degree Celsius in
                day time during winter. You won’t be wrong if you say this is the
                best time to visit in Tadoba National Park. The greenery looks so
                vibrant this season and the perfect backdrop for shoot.
                </p>
            </div>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg6">
                    <img src={climate1} alt="Climate Image" />
                </div>
                <div className="col-sm-12 col-md-6 col-lg6">
                    <img src={climate2} alt="Climate Image" />
                </div>
                <div className="col-sm-12 col-md-6 col-lg6">
                    <img src={climate3} alt="Climate Image" />
                </div>
                <div className="col-sm-12 col-md-6 col-lg6">
                    <img src={climate1} alt="Climate Image" />
                </div>
            </div>
          <p>
            Summer in Tadoba National Park is bit uncomfortable as the
            temperature rise up to 47 Degree Celcius. Monsoon comes in June and
            heavy rainfall makes the park close.
          </p>
        </div>
      </section>

      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default Climate;
