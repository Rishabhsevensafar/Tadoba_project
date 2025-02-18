import React from 'react'
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import zariBanner1 from "../../assets/images/zaribanner1.jpg"
import zariBanner2 from "../../assets/images/zaribanner2.jpg"
import zariBanner3 from "../../assets/images/zaribanner3.jpg"
import zari1 from "../../assets/images/zari.jpg"
import zari2 from "../../assets/images/zari2.jpg"
function ZariGate() {
  return (
   <>
 <Header></Header>
      <div>
        <section>
            <div className="row">
                <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
                    <img className="imgBannerZari" src={zariBanner1} alt="" />
                </div>
                <div className="col-sm-12 col-md-4 col-md-4 pe-lg-1 pb-0">
                    <img className="imgBannerZari" src={zariBanner2} alt="" />
                </div>
                <div className="col-sm-12 col-md-4 col-md-4 pb-0">
                    <img className="imgBannerZari" src={zariBanner3} alt="" />
                </div>
            </div>
        </section>
        <section className='pb-4 leaf pt-4'>
            <div className="container">
                <div className="row">
                <div className="col-sm-12 col-md-8 col-lg-8 pe-lg-3">
                    <div>
                    <h2>
                    TADOBA ZARI SAFARI GATE</h2>
                    <p>
                    Tadoba National Park is very ultimate and the view has very unique charm and the Zari gate in Tadoba National Park has many offerings and its connectivity to other gates is better. Booking safari from Zari gate will draw you to the core area and the central area of the Tadoba Tiger Reserve. You gonna have number of comfortable staycation nearby where you will be packed with all essential facilities. Almost all the forests are quite reachable from all entry gates but you need to take care of the travel time so booking for those gates will be wise decision which is near to the forests and spotting animals are easiest.
                    </p>
                    <p>
                    Tadoba is very small forest entry from different gates may vary. All the gates distance is around 30 kms to 100 kms. Booking for Zari gate will lead your way to all the core gates such as Moharli/Kolara/Navegaon/khutwanda gates. The duration of the travel from zari gate Tadoba to Chandrapur is 28 min drive.
                    </p>
                    <p>
                        Make your trip hassle free by deciding on everything prior
                        to your visit. Your guide has deep knowledge of forest so it
                        won’t be wrong to say that relying on them will be a wise
                        decision. Tadoba National Park is India’s most blessed tiger
                        reserve. It is drop-dead dazzling and finding a tiger here
                        is the biggest dream comes true for many wildlife
                        enthusiasts!
                    </p>
                    </div>
                    <h6>The Jeep is ideally restricted in every gate and number of gate varies with per jeep safari as well.</h6>
                </div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                    <img className="zariSafariImg" src={zari1} alt="" />
                    <img className="zariSafariImg" src={zari2} alt="" />
                </div>
                </div>
                <div>
                <h4>Jeep Safari in Tadoba/Zari Gate</h4>
                <p>
                The wildlife sighting here in zari gate is on and average and people do visit here in average number. Jeep safari to this Zari gate is the best experience one can have in Tadoba National Park. Tiger safari in the dense reserve is the place where spotting tiger is feasible.
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
                        <td>Nagpur to Zari Gate</td>
                        <td>187 km</td>
                        <td>Via Chandrapur - Nagpur Road</td>
                    </tr>
                    <tr>
                        <td>Chandrapur to Zari Gate</td>
                        <td> 35 km</td>
                        <td>Via NH930</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className="zarinotes">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <div>
                            <h6>Considerable Criteria:</h6>
                            <li>
                            In order to visit the Zari Gate, you need to obtain an entry permit for the safari, the same you need to show to the forest administrators at the entry gate.
                            </li>
                            <li>
                            45 days prior safari booking is best.
                            </li>
                            <li>
                            Booking policy has first come, first served basis and depending on availability.
                            </li>
                            <li>
                            You need to hire a jeep safari and a guide, which are compulsory for entry in the tiger reserve zone. Six adults and two children are allowed in jeep safari and driver and guide will also be there.
                            </li>
                            <li>
                            Booking in advance is always better for Tadoba tiger reserve Zari Gate as there is always a rush of tourists for the safari so avoid last minute hassle.
                            </li>
                            
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <h6>Advance Booking Procedure:</h6>
                            <li>
                            The full name, age, sex of each visitor as printed same on the identity cards to be provided along with the confirmatory amount
                            </li>
                            <li>Safari timing in (Morning/Afternoon)</li>
                            <li>
                            Specific ID card number of your ( Voter Id, Aaadhar No, Driving license No etc)
                            </li>
                            <li>Safari Entry fee should be paid in advance</li>
                            <li>Should be carrying the same ID card submitted while booking online.</li>
                            <li>
                            Please intimate us 45 days prior (for Indian nationals)
                            </li>
                            <li>
                            Foreign nationals can ask for booking 90 days in advance
                            </li>
                            <li>
                            Passport details are mandatory for making reservation of foreigner tourists
                            </li>
                            <li>Safari permit is issued on first come first serve basis (subject to availability)</li>
                            <li>In case your safari is not booked due to reasons like technical error or non-availability of seat, we will refund the whole amount in your given bank account. The same would be communicated accordingly.</li>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
      <ImportantLinks></ImportantLinks>
      <Footer></Footer>

   </>
  )
}

export default ZariGate