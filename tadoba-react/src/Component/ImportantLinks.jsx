import React from 'react'
import {Link} from "react-router-dom";
 
 
 
function ImportantLinks() {
   
    return (
        <>
        <section className="importantLinksSection">
            <div className="container">
                <div className='row'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    {/* <h4>Important Links</h4> */}
                    <h6>Tadoba Safari Zones</h6>
                    <ul className="linkpages">
                        <li> <Link to="/moharli"> Moharli </Link> </li>
                        <li> <Link to="/junonagate_gate"> Junona Gate  </Link></li>
                        <li> <Link to="/khutwanda_gate"> Khutwanda Gate </Link> </li>
                        <li> <Link to="/agarzari_gate"> Agarzari Gate  </Link></li>
                        <li> <Link to="/kolara_gate"> Kolara Gate </Link> </li>
                        <li> <Link to="/navegaon_gate"> Navegaon Gate </Link> </li>
                        <li> <Link to="/zari_gate"> Zari Gate </Link> </li>
                        <li> <Link to="/safari_gate"> Tadoba Safari Gates </Link> </li>
                        <li> <Link to="/tourism_zones"> Tadoba Tourism Zones </Link></li>
                    </ul>
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <h6>Tadoba Safari</h6>
                    <ul className="linkpages">
                        <li> <Link to="">  Tadoba Jeep Safari  </Link></li>
                        <li> <Link to="/canter">  Tadoba Canter Safari  </Link></li>
                        <li> <Link to="/permit_tips">  Safari Permit Tips  </Link></li>
                        <li> <Link to="/covid_safety_tips">  Covid Safety Tips  </Link></li>
                        <li> <Link to="/things_to_do">  Things to do  </Link></li>
                        <li> <Link to="/how_to_reach">  How to Reach  </Link></li>
                        <li> <Link to="/how_to_plan">  How to Plan  </Link></li>
                        <li> <Link to="/best_time_to_visit">  Best time to Visit  </Link></li>
                    </ul>
                </div>
            
                <div className='col-sm-12 col-md-12 col-lg-12'>
                    <h6>Tadoba Information</h6>
                    <ul className="linkpages">
                        <li> <Link to="/terms_conditions">  Terms & Conditions  </Link></li>
                        <li> <Link to="/privacy_policy">  Privacy Policy  </Link></li>
                        <li> <Link to="/refund">  Refund Policy  </Link></li>
                        <li> <Link to="/climate">  Tadoba Climate  </Link></li>
                        <li> <Link to="/faq">  Tadoba FAQs  </Link></li>
                        <li> <Link to="/map">  Tadoba Map  </Link></li>
                        <li> <Link to="/flora">  Tadoba Flora  </Link></li>
                        <li> <Link to="/fauna">  Tadoba Fauna  </Link></li>
                        {/* <li> <Link to="">  SiteLinks  </Link></li> */}
                    </ul>
                </div>
            </div>
            </div>
        </section>
       
        </>
    )
}
 
export default ImportantLinks