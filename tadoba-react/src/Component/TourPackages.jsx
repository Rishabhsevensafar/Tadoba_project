import React from "react";
import packageTour1 from "../assets/images/package tour.jpg";
import packageTour2 from "../assets/images/package tour2.jpg";
import packageTour3 from "../assets/images/package tour3.jpg";
import packageTour4 from "../assets/images/package tour4.jpg";
function TourPackages() {
  return (
    <>
      <div className="section tourPackage">
        <div className="container">
        <h2 className="packageHeading">More Tour Packages in Tadoba</h2>
        <div className="row">
          <div className="col-lg-6 col-lg-6 col-sm-12">
            <div className="packagebox">
              <div>
                <img className="packageImg" src={packageTour1} alt="" />
              </div>
              <div className="package">
                
                <h3 className="headZones">Tadoba Weekend Tour</h3>
                <p>01 Days/02 Nights</p>
                <p>
                  Lush green Tadoba is no less than heaven on earth. The real
                  highlight of Tadoba National Park exists in its.....
                </p>
                <button className="readmore">Read More...</button>
              </div>
            </div>




            <div className="packagebox">
              <div>
                <img className="packageImg" src={packageTour2} alt="" />
              </div>
              <div className="package">
                
                <h3 className="headZones">Tadoba Weekend Tour</h3>
                <p>01 Days/02 Nights</p>
                <p>
                  Lush green Tadoba is no less than heaven on earth. The real
                  highlight of Tadoba National Park exists in its.....
                </p>
                <button className="readmore">Read More...</button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-lg-6 col-sm-12">
            <div className="packagebox">
              <div>
                <img className="packageImg" src={packageTour3} alt="" />
              </div>
              <div className="package">
                
                <h3 className="headZones">Tadoba Weekend Tour</h3>
                <p>01 Days/02 Nights</p>
                <p>
                  Lush green Tadoba is no less than heaven on earth. The real
                  highlight of Tadoba National Park exists in its.....
                </p>
                <button className="readmore">Read More...</button>
              </div>
            </div>
            <div className="packagebox">
              <div>
                <img className="packageImg" src={packageTour4} alt="" />
              </div>
              <div className="package">
                
                <h3 className="headZones">Tadoba Weekend Tour</h3>
                <p>01 Days/02 Nights</p>
                <p>
                  Lush green Tadoba is no less than heaven on earth. The real
                  highlight of Tadoba National Park exists in its.....
                </p>
                <button className="readmore">Read More...</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default TourPackages;
