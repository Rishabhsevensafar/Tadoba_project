import React from "react";
import covidBanner from "../../assets/images/covid-banner.jpg";
import covid1 from "../../assets/images/covid.jpg";
import covid2 from "../../assets/images/covid2.jpg";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import { useEffect } from "react";
import Header from "../Header";
function CovidPage() {
     useEffect(()=>{
          window.scrollTo(0, 0);
        },[])
  return (
    <>
      <Header />
      <div>
        <img src={covidBanner}  className="covidBanner" alt="Permit banner image" />
      </div>
      <section className="leaf pb-4">
            <div className="container containerBackground">
                <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                        <h2>COVID 19 SAFETY RULES AT TADOBA</h2>
                        <p>
                            Pandemic is one of the worst situations that we are still
                            facing. Tadoba reopened this year in October. We learnt to live
                            in this world with this Covid 19. Now Tadoba has already opened,
                            so you must follow a few measure restrictions.
                        </p>
                        <p>
                            Authorities of Tadoba have decided to take all Covid 19 measures
                            which will be quite safe for ongoing tourists. Needless to be
                            fearful as we have maintained all proper safety which is worth
                            trying till date and keeping our all traveler’s safe. The fresh
                            start will keep the travelers up to date and that is also
                            without any compromises.
                        </p>
                            <h4>Entry Permitted with Covid-19 Safety Guidelines:-</h4>
                            <p>
                                Entry to Tadoba National Park is now limited as there is age
                                criteria involved. Below the age of 10 years kids are strictly
                                not allowed while tourists above 65 years and pregnant women are
                                not allowed to visit the national park. The maximum tourists are
                                allowed are only 6 members including driver and guide. Entry to
                                Tadoba National Park is now limited as there is age criteria
                                involved. Below the age of 10 years kids are strictly not
                                allowed while tourists above 65 years and pregnant women are not
                                allowed to visit the national park. The maximum tourists are
                                allowed are only 6 members including driver and guide.
                            </p>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4 mt-4">
                            <img src={covid1} className="imgCovid" alt="Covid image" />
                            <img src={covid2} className="imgCovid mt-2" alt="Covid image" />
                        </div>
                </div>

                {/* <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-8">
                    
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 ">
                    <img src={covid2} className="imgCovid" alt="Covid image" />
                    </div>
                </div> */}

        
                <div className="covidpara">
                    <h4>Remarkable Points:</h4>
                    <ul>
                        <li>
                        Mask is mandatory and also the inclusion of measures like
                        social distancing, sanitization and scanning are some of the
                        measures that need to be followed.
                        </li>
                        <li>
                        The tourists must not be Covid 19 or should not have any
                        symptoms of it otherwise they won’t be allowed to enter the
                        park even in case of advance booking.
                        </li>
                        <li>
                        Each passenger must follow the rules of social distancing
                        while having safaris too.
                        </li>
                        <li>
                        All modes of safaris should be properly sanitized before
                        riding.
                        </li>
                        <li>Only online booking is available at this crucial time.</li>
                        <li>
                        Aarogya Setu must be downloaded on your mobile before being in
                        the park.
                        </li>
                        <li>
                        Safari riders are not allowed to carry any food stuff out
                        there. Yes, only water bottles are allowed.
                        </li>
                        <li>Keep the distance of 6 feet at least in each one.</li>
                    </ul>

                    <h4>Hotels and Resorts COVID-19 Precautions:-</h4>
                    <ul>
                        <li>
                        The entry to the hotels and resorts are feasible only after a
                        thermal screening test.
                        </li>
                        <li>
                        The whole property sanitization of the hotels and resorts is
                        done thoroughly in every area.
                        </li>
                        <li>
                        In case any tourists are feverish or have a cold they will be
                        quarantined and authorities will be doing something about it.
                        </li>
                        <li>
                        Wearing masks is mandatory and you should not be seen anywhere
                        without a mask.
                        </li>
                        <li>All food items get sanitized properly before cooking..</li>
                        <li>
                        No crowd and over gathering is allowed so maintaining proper
                        social distancing is mandatory in every area of the property
                        of the hotels and resorts.
                        </li>
                        <li>
                        Aarogya Setu app must be in your phone so tracking would be
                        easier for you.
                        </li>
                    </ul>
                    <p>
                        If you have to stay safe then you need to follow these certain rules
                        which will be best for your loved ones and for the authorities. You
                        can have the best time around in Tadoba National Park when you
                        follow all the guidelines. Remember your safety is our safety so
                        follow all the guidelines precisely to avoid any miserable
                        condition. Make your trip worthwhile and peaceful with us and we are
                        happy to serve you best.
                    </p>
                </div>
            </div>
      </section>
      <ImportantLinks />
      <Footer />
    </>
  );
}

export default CovidPage;
