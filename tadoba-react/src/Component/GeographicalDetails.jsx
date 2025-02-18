import React from "react";
import map from "../assets/images/map.jpg";
import wild from "../assets/images/tour-package2.webp";
function GeographicalDetails() {
  return (
    <>
      <section className="geographicalsection">
        <div className="container geographical">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <h3>Geographical Details about Tadoba</h3>
              <ul>
                <li>Total Forest Area – 1536 Square Kilometres</li>
                <li>Core Area – 716 square kilometres</li>
                <li>
                  Type of Forest – tropical moist, deciduous forests with sal,
                  mixed forest.
                </li>
                <li>
                  Rivers – Johilla, janadh, charanganga, Damnar, Banbei,
                  Ambanala and Andhiyari Jhiria
                </li>
                <li>Hills – Tadoba hill, rising 811 meters above sea level</li>
                <li>
                  Temperature – maximum 40 degree Celsius in summer and 8 degree
                  in winter
                </li>
                <li>
                  Annual Rainfall – The average rainfall of Tadoba National Park
                  is 1133mm
                </li>
              </ul>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <img className="map" src={map} alt="" />
            </div>
          </div>

          <h3 className="roadData">
            Road Distance from Tadoba to following Cities
          </h3>
          <div className="row geographicalData">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <ul>
                <li>Distance from Nagpur 140 km</li>
                <li>Distance from Pune 742 km</li>
                <li>Distance from Mumbai 856 km</li>
                <li>Distance from Gwalior 850 km</li>
                <li>Distance from Navi Mumbai 858 km</li>
                <li>Distance from Indore 856 km</li>
                <li>Distance from Indore 856 km</li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              {" "}
              <ul>
                <li>Distance from Nagpur 140 km</li>
                <li>Distance from Pune 742 km</li>
                <li>Distance from Mumbai 856 km</li>
                <li>Distance from Gwalior 850 km</li>
                <li>Distance from Navi Mumbai 858 km</li>
                <li>Distance from Indore 856 km</li>
                <li>Distance from Indore 856 km</li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <img className="wildImg" src={wild} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default GeographicalDetails;
