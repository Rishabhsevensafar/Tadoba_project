import React from "react";
import { useEffect } from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import agarzarigate1 from "../../assets/images/agarzari-gate.jpg";
import agarzariBanner1 from "../../assets/images/agarzari-banner1.jpg";
import agarzariBanner2 from "../../assets/images/agarzar-banner2.jpg";
import agarzariBanner3 from "../../assets/images/agarzari-banner3.jpg";
import agarzarigate2 from "../../assets/images/agarzari-gate1.jpg";
import Footer from "../Footer";
function AgarzariGate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header></Header>
      <section>
            <div className="row">
                <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
                    <img className="imgBannerAgarzari" src={agarzariBanner1} alt="" />
                </div>
                <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
                    <img className="imgBannerAgarzari" src={agarzariBanner2} alt="" />
                </div>
                <div className="col-sm-12 col-md-4 col-md-4 pb-0">
                    <img className="imgBannerAgarzari" src={agarzariBanner3} alt="" />
                </div>
            </div>
      </section>
      <section className="pb-5 leaf">
        <div className="container">
            <div className="row">
            <div className="col-sm-8 col-md-8 col-lg-8 pe-lg-3">
              <h1>TADOBA AGARZARI SAFARI GATE</h1>
              <p>
                It is amazing how one place can have it all from wildlife,
                hills, beautiful water bodies such as ponds and lake, rugged
                terrain this is what Tadoba National Park has to offer. If you
                are lucky enough you can catch a glimpse of majestic Tiger in
                their natural habitat. It is located at a distance of 112 kms
                from Chandrapur and 104 kms from Nagpur. Tadoba’s different
                zones and gates are the mark of beauty and lead you to the tough
                areas even.
              </p>
              <p>
                Agarzari Gate Tadoba is one of the best destinations for family
                outings in the stream of park, resorts and water parks category
                in (Gadchiroli) Maharashtra. Agarzari Gate is in buffer zone and
                constituted with immense opportunities to make you explore more
                wildlife. This gate is in center so most of the areas can be
                covered easily.
              </p>
              <p>
                People are the big fan of this gate as it has special things to
                cover. It is neat & clean and spending sometime in isolation is
                also great thing to do. Those who love to get entertained can
                wander to this gate and have good time around greenery and
                different species of animals and birds.
              </p>
              <p>
                People are the big fan of this gate as it has special things to
                cover. It is neat & clean and spending sometime in isolation is
                also great thing to do. Those who love to get entertained can
                wander to this gate and have good time around greenery and
                different species of animals and birds.
              </p>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <img className="agarzarisafariImg" src={agarzarigate1} alt="" />
              <img className="agarzarisafariImg" src={agarzarigate2} alt="" />
            </div>
            <h6>
              It makes you familiar in all segments of entertainment spot such
              as parks, amusement park, water park, picnic spots and resorts.
            </h6>
            </div>
            <div>
            <h4>Jeep Safari in Tadoba/Agarzari Gate</h4>
            <p>
              Agarzari gate is one of the best tourism gates. It introduces you
              wildlife deeply and gives the real essence of adventures and
              sightings fully. Our information will help you deeply so you will
              be getting most of the wildlife smoothly. Total 10 jeep safari
              available in agarzari gate. 5 jeeps in morning and 5 jeeps in
              evening.
              <p>
                {" "}
                Total 18 Jeep safaris are available in Junona gate. 6 jeeps in
                morning, 6 jeeps in evening and 6 jeeps in night.
              </p>
            </p>
            </div>
            <div>
            <h4>Route Chart</h4>
            <table className="table ">
              <thead className="table-active">
                <tr>
                  <th scope="col">Location</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Route</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nagpur to Agarzari Gate</td>
                  <td>166 km</td>
                  <td>Via Chandrapur - Nagpur Rd</td>
                </tr>
                <tr>
                  <td>Chandrapur to Agarzari Gate</td>
                  <td>18 km</td>
                  <td>Via Durgapur Road</td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="agarzarinotes">
            <h6>Advance Booking Procedure:</h6>
            <li>
              The full name, age, sex of each visitor as printed same on the
              identity cards to be provided along with the confirmatory amount
            </li>
            <li>Safari timing in (Morning/Afternoon)</li>
            <li>
              Specific ID card number of your ( Voter Id, Aaadhar No, Driving
              license No etc)
            </li>
            <li>Safari Entry fee should be paid in advance</li>
            <li>
              Should be carrying the same ID card submitted while booking
              online.
            </li>
            <li>Please intimate us 45 days prior (for Indian nationals)</li>
            <li>Foreign nationals can ask for booking 90 days in advance</li>

            <li>
              Passport details are mandatory for making reservation of foreigner
              tourists
            </li>
            <li>
              Safari permit is issued on first come first serve basis (subject
              to availability)
            </li>
            <li>
              In case your safari is not booked due to reasons like technical
              error or non-availability of seat, we will refund the whole amount
              in your given bank account. The same would be communicated
              accordingly.
            </li>
            </div>
        </div>
      </section>
      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default AgarzariGate;
