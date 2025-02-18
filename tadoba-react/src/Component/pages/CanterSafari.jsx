import React from "react";
import ImportantLinks from "../ImportantLinks";
import Header from "../Header";
import Footer from "../Footer";
import { useEffect } from "react";
import canterBanner from "../../assets/images/canter-banner.jpg";
import canter from "../../assets/images/canter.jpg";
function CanterSafari() {
     
  return (
    <>
      <Header />
        <section>
            <div>
                <img src={canterBanner} className="canterBanner" alt="Canter safari banner image"/>
            </div>
        </section>
        <section className="pb-4 leaf">
            <div className="container">
            <h2>CANTER SAFARI IN TADOBA NATIONAL PARK</h2>
            <p>
                Tadoba National Park in Chandrapur district of Maharashtra is a
                renowned wildlife haven that receives plenty of footfalls throughout
                the year from across the globe. Needless to mention, the primary
                attraction of Tadoba National Park is embarking on wildlife safaris,
                with the predominant motive to sight tigers and other big cats.
                White jeep safaris are the most common mode to traverse the wildlife
                of the national park, the Moharli Zone and the Kolara Zone
                encompasses canter safari to take travel enthusiasts deep inside the
                zone.
            </p>

            <p><strong>Canter Safari in Kolara and Moharli Zones</strong></p>
            <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-8"> 
                <h4>About a Canter Safari</h4>
                <p>
                    A canter is a bus-like structure, bigger in size as compared to
                    the conventional jeeps. Consequently, the seating capacity is
                    also high, thus facilitating a bigger group of tourists to enjoy
                    the safari experience at a single canter safari round. Unlike
                    buses, the sides of the canter are open to enjoy the views of
                    forest landscape and spot wildlife unhindered. The canters in
                    Tadoba can accommodate 22 people at a time, which include a
                    driver and 2 guides.
                    <p>
                    Canter Safaris are conducted in two shifts in both of these
                    reputed zones of Tadoba - morning and evening. The best part
                    of opting for a canter safari is, it is a budget friendly
                    option to venture the forest in full swing
                    </p>
                </p>
                <span>Please Note: </span>Advance and online booking of canter
                safari is not available for Moharli and Kolara Zones. Tickets are
                to be booked only for the same day safari and tourists can avail
                the same from the ticket counter outside the Kolara and Moharli
                Zone entry gates.
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4">
                <img
                    src={canter}
                    className="imgCanter"
                    alt="canter safari image"
                />
                </div>
            </div>

            <section>
                <div className="">
                <h4>Tadoba Canter Safari Booking Price</h4>
                <table class="table table-bordered mt-3">
                    <tbody>
                    <tr>
                        <td>Canter Price (Indian):</td>
                        <td colSpan="3">
                        INR 1000 / Person (Maximum 22 Persons are allowed in ONE
                        Canter)
                        </td>
                    </tr>
                    <tr>
                        <td>Zone :</td>
                        <td colSpan="3">Moharli Gate and Kolara Gate</td>
                    </tr>
                    <tr>
                        <td>Morning Timing :</td>
                        <td colSpan="3">06:30 AM - 11:00 AM</td>
                    </tr>
                    <tr>
                        <td>Evening Timing :</td>
                        <td colSpan="3">02:30 PM - 06:30 PM</td>
                    </tr>
                    <tr>
                        <td>The price includes :</td>
                        <td colSpan="3">
                        Canter & Driver, Permit Charges, Guide Charges, Online
                        Payment Gateway Charges & Our Service Charges and Taxes.
                        </td>
                    </tr>
                    <tr>
                        <td>Note :</td>
                        <td colSpan="3">
                        Canter Safari are non refundable and online bookings are
                        not available.
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </section>
            <section>
                <h5>Kolara Zone -</h5>
                <p>
                The entry to this zone is one of the well-structured entrances to
                Tadoba National Park and is among the most preferred access
                points. The dense bamboo trees in the area create a stunning
                visual appeal. It is highly recommended for all nature
                enthusiasts, as experiencing its unique features is sure to be
                rewarding. Wildlife sightings are particularly abundant during the
                morning and evening hours, providing ample opportunities to
                enhance your adventure.
                </p>
                <h5>Moharli Zone -</h5>
                <p>
                The Moharli Zone is a popular tiger territory and one of the
                oldest entry gates in Tadoba National Park. The Moharli tourism
                zone is renowned for its canter safaris, owing to the high density
                of wildlife species present in the area. Located within the Tadoba
                Andhari Tiger Reserve, this zone provides convenient access to a
                diverse range of animals, including the Royal Bengal tiger,
                leopard, sloth bear, hyena, jackal, wild dog, sambar, chital,
                langur, nilgai, and numerous other species. As a result, the
                likelihood of encountering wildlife in this zone is significantly
                elevated.
                </p>
            </section>
            <section>
                <h4>Route Chart of Canter Safari in Tadoba National Park</h4>
                <h6>Kolara Gate</h6>

                <table className="mt-3 table table-bordered">
                <thead className="table-secondary table-bordered">
                    <tr>
                    <th scope="col">Nearby Cities</th>
                    <th scope="col">Distance</th>
                    <th scope="col">Route</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>From Chandrapur</td>
                    <td>29 km</td>
                    <td>Via Chandrapur - Durgapur Road</td>
                    </tr>
                    <tr>
                    <td>From Nagpur</td>
                    <td>144 km</td>
                    <td>Via NH44</td>
                    </tr>
                </tbody>
                </table>

                <h6>Moharli Gate</h6>

                <table className="mt-3 table table-bordered">
                <thead className="table-secondary table-bordered">
                    <tr>
                    <th scope="col">Nearby Cities</th>
                    <th scope="col">Distance</th>
                    <th scope="col">Route</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>From Chandrapur</td>
                    <td>105 km</td>
                    <td>Via NH930</td>
                    </tr>
                    <tr>
                    <td>From Nagpur</td>
                    <td>104 km</td>
                    <td>
                        Via Armori - Nagpur Hwy/Gadchiroli - Nagpur Hwy/Kurkheda -
                        Wadsa - Bramhapuri - Nagpur Hwy and NH353E
                    </td>
                    </tr>
                </tbody>
                </table>
            </section>
            </div>
        </section>
      <ImportantLinks />
      <Footer />
    </>
  );
}

export default CanterSafari;
