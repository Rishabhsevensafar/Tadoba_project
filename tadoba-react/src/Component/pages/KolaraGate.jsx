import React, { useEffect } from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";

import kolaraBanner1 from "../../assets/images/kolaraBanner1.jpg";
import kolaraBanner2 from "../../assets/images/kolaraBanner2.jpg";
import kolaraBanner3 from "../../assets/images/kolaraBanner3.jpg";
import kolara1 from "../../assets/images/kolara.jpg";
import kolara2 from "../../assets/images/kolara2.jpg";

function KolaraGate() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Header></Header>
      <section>
          <div className="row">
            <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
              <img className="imgBannerkolara" src={kolaraBanner1} alt="" />
            </div>
            <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
              <img className="imgBannerkolara" src={kolaraBanner2} alt="" />
            </div>
            <div className="col-sm-12 col-md-4 col-md-4 pb-0">
              <img className="imgBannerkolara" src={kolaraBanner3} alt="" />
            </div>
          </div>
        </section>
        <section className="pb-5 leaf">
            <div className="container">
            
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8 pe-lg-3">
                        <div>
                        <h2>TADOBA KOLARA SAFARI GATE</h2>
                        <p>
                            Tadoba National Park is a pristine forest with endless
                            sightings and the feel of the jungle is the extension of joy
                            and pride both. Tadoba has different gates and zones and
                            they are constituted with categorization. The real view via
                            jeep safari leads your way to heaven through. So choosing
                            the right gate indeed depends on high chance of sightings.
                            The entry through Kolara Gate has its own charm and gives
                            the exclusive experience of wildlife. Kolara Gate is
                            positioned halfway between Navegaon and Moharli and is the
                            second most popular entry gate after Moharli.
                        </p>
                        <p>
                            The open Gypsy safari allows you to enjoy the forest beauty
                            wholeheartedly. The most desirable thing here is that the
                            highest tiger density gives you a good opportunity to see
                            the tigers in their habitat. Kolara Gate is one of the
                            oldest gates of Tadoba for the core zone and the buffer
                            zone. It is one of the gates of Tadoba Tiger Reserve that is
                            structured in a good way. The gate is providing 9 jeeps
                            safari per day. Visiting the core zone and buffer zone of
                            Kolara is ideally beautiful. The dense bamboo tree looks so
                            fabulous here. A must visit for all wanderlusts and go
                            through its specialty, you will not regret. During morning
                            and evening, sightings are huge so make the most of the
                            adventure.
                        </p>
                        <p>
                            Jeep Safari from Kolara Gate has better connectivity with
                            other areas of the forest even deep forest is easily
                            accessible. Tiger safari through this gate lets you spot
                            tigress Maya with her cubs so it is considered one of the
                            best Tiger safari destinations. Sightseers will certainly
                            enjoy Rudra male and Maya also Tala with 4 cubs at Talab at
                            Tadoba safari. The jungle is very active and the core gate
                            is the first choice for every tourist. This is why booking
                            in advance always preferable gives you gates of your choice.
                        </p>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-4 col-lg-4">
                        <img className="junonaSafariImg" src={kolara1} alt="" />
                        <img className="junonaSafariImg" src={kolara2} alt="" />
                    </div>
                    <h6>
                        Kolara gate is the most visited tourism gate in Kolara Zone.
                        Total 14 jeep safaris available in a day. 7 jeeps in the morning
                        and 7 jeeps in the evening.
                    </h6>
                </div>
                <div>
                <h4>Jeep Safari in Tadoba/Kolara Gate</h4>
                <p>
                    Jeep Safari from Kolara Gate has better connectivity with other
                    areas of the forest even deep forest is easily accessible. Tiger
                    safari through this gate lets you spot tigress Maya with her
                    cubs so it is considered one of the best Tiger safari
                    destinations. Sightseers will certainly enjoy Rudra male and
                    Maya also Tala with 4 cubs at Talab at Tadoba safari. The jungle
                    is very active and the core gate is the first choice for every
                    tourist. This is why booking in advance always preferable gives
                    you gates of your choice.
                </p>
                </div>
                <div>
                    <h4>Route Chart</h4>
                    <table className="table">
                        <thead className="table-active">
                        <tr>
                            <th scope="col">Location</th>
                            <th scope="col">Distance</th>
                            <th scope="col">Route</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Nagpur to Kolara Gate</td>
                            <td>103 km</td>
                            <td>Via Chandrapur - Nagpur Road</td>
                        </tr>
                        <tr>
                            <td>Chandrapur to Kolara Gate</td>
                            <td>110 km</td>
                            <td>Via Durgapur Road</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

            <div className="kolaranotes">
                <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <h6>Kolara gate is having some of the great staying hotels:</h6>
                    <li>Tadoba tiger king resort</li>
                    <li>Svasara resort</li>
                    <li>Bamboo forest safari lodge</li>
                    <li>7 tigers tadoba</li>
                </div>

                <div className="col-sm-12 col-md-12 col-lg-12">
                    <h6>Remarkable Points:</h6>
                    <li>
                    In order to visit the Kolara Gate, you must have an entry
                    permit for the safari, the same you have to show to the forest
                    administrators at the entry gate.
                    </li>
                    <li>
                    Prefer to book your safari entry permit online maximum of 45
                    days prior so that you may get your desirable gate.
                    </li>
                    <li>
                    Booking policy describes first come, first served basis and
                    depending on availability.
                    </li>
                    <li>
                    Must hire a safari jeep and a guide, which are mandatory for
                    entry in the tiger reserve area.
                    </li>
                    <li>
                    Booking in advance is always better for Tadoba tiger reserve
                    Kolara Gate as there is always a rush of tourists for the
                    safari so avoid last minute hassle.
                    </li>
                    <li>
                    Booking in advance has all benefits so always prefer it.
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

export default KolaraGate;
