import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import khutwanda1 from "../../assets/images/khutwanda-gate.jpg";
import khutwandabanner from "../../assets/images/khutwanda-banner.jpg";
import khutwandabanner1 from "../../assets/images/khutwanda-banner2.jpg";
import khutwandabanner2 from "../../assets/images/khutwanda-banner3.jpg";
import khutwanda2 from "../../assets/images/khutwanda-gate2.jpg";
import Footer from "../Footer";
import { useEffect } from "react";
function KhutwandaGate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header></Header>
        <section className="">
            <div className="row">
            <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
                <img className="imgBannerKhutwanda " src={khutwandabanner} alt="" />
            </div>
            <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
                <img className="imgBannerKhutwanda" src={khutwandabanner1} alt="" />
            </div>
            <div className="col-sm-12 col-md-4 col-md-4 pb-0">
                <img className="imgBannerKhutwanda" src={khutwandabanner2} alt="" />
            </div>
            </div>
        </section>
        <section className="pb-5 leaf">
            <div className="container">
                <div className="row">
                <div className="col-sm-8 col-md-8 col-lg-8 pe-lg-3">
                    <h1>TADOBA KHUTWANDA SAFARI GATE</h1>
                    <p>
                    Tadoba National Park is undoubtedly one of the most renowned
                    national parks in India due to its best tiger reserve, which
                    houses countless globally famed tigers. The safari in the
                    Tadoba tiger reserve represents hundreds of thousands of
                    wildlife enthusiasts every year. Though the majestic tigers
                    are the prime attraction in Tadoba but birding is also a
                    drawing attraction here for the bird lovers. Khutwanda Gate is
                    one of six core gates in Tadoba National Park. It is not
                    necessary that you are successful in spotting tigers but the
                    experience of lifetime visiting in the park is timeless.
                    Khutwanda Gate is a must visit for the beauty of the forest.
                    </p>
                    <p>
                    Both Khutwanda and Moharli gates lead to the Tadoba National
                    park similar forest ranges. These two gates are not very far
                    enough so if you are taking a safari to Khutwanda then you
                    should not spare yourself visiting Moharli too. Safari to
                    Khutwanda Gate is more accessible to forest and it has calm
                    surroundings. Sightings from Khutwanda Gate are generous and
                    this middle gate of Tadoba Andhari Tiger Reserve is also
                    interconnected with several ranges. The left side is leading
                    you to the Koekana, Jamuni, and Navegaon while when you go
                    right, you can view Jamun jhora, Telia, Mohruli. You are at
                    the center of the park from where you can easily access other
                    ranges of forests. There are 3 or 4 versatile resorts near
                    this gate and you have alternatively staycation in Moharli
                    which is only 20 to 25 min drive away.
                    </p>
                    <p>
                    Khutwanta Gate is one of the best wildlife gates and spotting
                    almost all the animals here is easy.
                    </p>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                    <img className="moharliSafariImg" src={khutwanda1} alt="" />
                    <img className="moharliSafariImg" src={khutwanda2} alt="" />
                </div>
                <h6>
                    Note: Bring all ID’s for avoiding last minute hassle as
                    authorities are becoming stricter with this..
                </h6>
                </div>
                <div>
                <h4>Jeep Safari in Tadoba/Khutwanda Gate</h4>
                <p>
                    Tadoba Khutwanda Gate is a must visit as it is so close to the
                    Moharli Gate too. Believe it or not you will be having a
                    wonderful time with your family and friends. The gate deserves
                    all attention for ample reasons. Total 10 Jeep safaris are
                    available in Khutwanda gate. 5 jeeps in morning and 5 jeeps in
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
                        <td>Nagpur to Khutwanda Gate</td>
                        <td>130 km</td>
                        <td>Via Chandrapur - Nagpur Road</td>
                    </tr>
                    <tr>
                        <td>Chandrapur to Khutwanda Gate</td>
                        <td>40 km</td>
                        <td>Via Durgapur Road</td>
                    </tr>
                    </tbody>
                </table>
                </div>

            <div className="khutwandinotes">
                <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <h6>Things to Consider:</h6>
                    <li>
                    In order to visit the Khutwanta Gate, you need to obtain an
                    entry permit for the safari, the same you have to show to the
                    forest administrators at the entry gate.
                    </li>
                    <li>
                    Book your safari entry permit online maximum of 45 days prior
                    or you can book safari from the forest office the same day.
                    </li>
                    <li>
                    Booking policy narrates first come, first served basis and
                    depending on availability.
                    </li>
                    <li>
                    You need to hire a safari jeep and a guide, which are
                    compulsory for entry in the tiger reserve area. </li>
                    <li>Six adults and two children are allowed in jeep safari and driver and guide
                    will also be there.
                    </li>
                    <li>
                    The entry permit to the Tadoba National Park is provisional
                    and can be changed or cancelled without any prior information.
                    </li>
                    <li>
                    Booking in advance is always better for Tadoba tiger reserve
                    Khutwanda Gate as there is always a rush of tourists for the
                    safari so avoid last minute hassle.
                    </li>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12">
                    <h6>Advance Booking Procedure:</h6>
                    <li>
                    The full name, age, sex of each visitor as printed same on the
                    identity cards to be provided along with the confirmatory
                    amount
                    </li>
                    <li>Safari timing in (Morning/Afternoon)</li>
                    <li>
                    Specific ID card number of your ( Voter Id, Aaadhar No,
                    Driving license No etc)
                    </li>
                    <li>Safari Entry fee should be paid in advance</li>
                    <li>
                    Should be carrying the same ID card submitted while booking
                    online.
                    </li>
                    <li>Please intimate us 45 days prior (for Indian nationals)</li>
                    <li>
                    Foreign nationals can ask for booking 90 days in advance
                    </li>
                    <li>
                    Passport details are mandatory for making reservation of
                    foreigner tourists
                    </li>
                    <li>
                    Safari permit is issued on first come first serve basis
                    (subject to availability)
                    </li>
                    <li>
                    In case your safari is not booked due to reasons like
                    technical error or non-availability of seat, we will refund
                    the whole amount in your given bank account. The same would be
                    communicated accordingly.
                    </li>
                </div>
                </div>
            </div>
            </div>
        </section>
      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default KhutwandaGate;
