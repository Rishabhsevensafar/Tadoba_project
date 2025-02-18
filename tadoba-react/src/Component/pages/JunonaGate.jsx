import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import junonaBanner1 from "../../assets/images/banner-junona1.jpg";
import junonaBanner2 from "../../assets/images/banner-junona2.jpg";
import junonaBanner3 from "../../assets/images/banner-junona3.jpg";
import junona1 from "../../assets/images/junona.jpg";
import junona2 from "../../assets/images/junona2.jpg";
import Footer from "../Footer";
import { useEffect } from "react";
function JunonaGate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header></Header>
      <section>
        <div className="row">
          <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
            <img className="imgBannerJunona" src={junonaBanner1} alt="" />
          </div>
          <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
            <img className="imgBannerJunona" src={junonaBanner2} alt="" />
          </div>
          <div className="col-sm-12 col-md-4 col-md-4 pb-0">
            <img className="imgBannerJunona" src={junonaBanner3} alt="" />
          </div>
        </div>
        </section>
        <section className="leaf">
        <div className="container py-4">
            <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-8 pe-lg-3">
                <h1>TADOBA JUNONA SAFARI GATE</h1>
                <p>
                    Tadoba National Park is the most-hunted park for wildlife
                    enthusiasts. It is constituted with a variety of flora and fauna
                    which are making a perfect backdrop for your vacation. Tadoba
                    National Park is located in Chandrapur district in Maharashtra.
                    The park is no less than heaven and tigers here can be found in
                    abundance. There is no dearth of beauty with full brain-drain
                    wildlife activities. Meeting a tiger here is not rare and
                    struggling. But don’t get disappointed if your luck is not in
                    your favor. We got you cover and your rare chance will turn into
                    a strong chance of spotting a tiger.
                </p>
                <p>
                    Right Tadoba Safari gates are to some extent very important and
                    make more chances to spot tigers. Junona Gate is one of the
                    ideal destinations and perfect safari zone. It is a fusion of
                    the Core & Buffer area of Tadoba Andheri Tiger Reserve. Leading
                    your safaris to this phenomenal zone is always rejoicing. The
                    USP of this Junona Gate is that you can have both the Core and
                    Buffer Area of Tadoba Jungle.
                </p>
                <p>
                    Tadoba Tiger Reserve Junona Gate gives access to the wild
                    natural world consisting of animals like tigers, leopards, sloth
                    bear, hyena, jackal, wild dog, sambar, cheetal, langoors,
                    nilgai, etc. The full fledged jeep safari visit will be
                    enjoyable and a permit to Junona gate is easily available. The
                    movement of tourists inside the park is not restricted like in
                    other reserves, therefore one can completely enjoy a jeep safari
                    all over the park. The names of the gates at Tadoba National
                    Park are listed below
                </p>
                <p>
                    Advance booking is best suggested for taking a safari ride to
                    Junona zone. Junona forest area permit is can be done for safari
                    entry gate on our website. Better do advance booking for
                    avoiding last minute hassle.
                </p>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                <img className="junonaSafariImg" src={junona1} alt="" />
                <img className="junonaSafariImg" src={junona2} alt="" />
                </div>
                <h6>
                During monsoon season almost all prime safari zones are closed.
                </h6>
            </div>
            <div>
                <h4>Jeep Safari in Tadoba/Junona Gate</h4>
                <p>
                Junona gate is also very popular in terms of gypsies, guides and
                accommodations and available at that gate only. For the morning
                and evening safari permit, advance booking is best.
                </p>
                <p>
                    {" "}
                    Total 18 Jeep safaris are available in Junona gate. 6 jeeps in
                    morning, 6 jeeps in evening and 6 jeeps in night.
                
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
                    <td>Nagpur to Junona Gate</td>
                    <td>140 km</td>
                    <td>Via Chandrapur - Nagpur Rd/Mancherial</td>
                    </tr>
                    <tr>
                    <td>Chandrapur to Junona Gate</td>
                    <td>30 km</td>
                    <td>Via Durgapur Road</td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div className="junonanotes mt-md-4">
                <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="fewFacts">
                    <h6>Important Note:</h6>
                    <li>Choose the gate for safari as per your accommodation.</li>
                    <li>
                        Book your permit through the gates which are close to your
                        resort.
                    </li>
                    <li>
                        All the buffer gates will be closed on Wednesday from Feb 1
                    </li>
                    <li>
                        Visitors are required to get hands on entry permits that are
                        being subjected to receive online (by producing above
                        mentioned documents)
                    </li>
                    <li>
                        The entry permit to the Tadoba National Park is provisional
                        and can be changed or cancelled without any prior
                        information.
                    </li>
                    <li>
                        The rules are made by Tadoba Tiger Reserve Director and we
                        have to follow the guidelines.
                    </li>
                    <li>
                        Registered guides are pre-decided so please do not make a
                        change in the guide or naturalist.
                    </li>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="fewFacts">
                    <h6>Few Facts</h6>
                    <li>
                        You should carry a safari voucher while at the entry to the
                        safari gate for a safari ride.
                    </li>
                    <li>
                        The name of the person in the voucher should match with the
                        person in gypsy.
                    </li>
                    <li>
                        Original id’s required for the verification for the entry of
                        safari gate.
                    </li>
                    <li>
                        Same ID’s required for the voucher and the one you have to
                        show.
                    </li>
                    <li>
                        TMust reach the safari gate half an hour before the exact
                        time.
                    </li>
                    <li>
                        Drivers and guides are allocated from the forest department.
                    </li>
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12">
                    <div className="fewFacts">
                    <h6>Advance Booking Procedure:</h6>
                    <li>
                        The full name, age, sex of each visitor as printed same on
                        the identity cards to be provided along with the
                        confirmatory amount
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
                    <li>
                        Jeep Safari & Canter Safari amounts are non refundable.
                    </li>
                    </div>
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

export default JunonaGate;
