import React from "react";
import { Link } from "react-router-dom";

function ImportantLinks() {
  return (
    <section className="links-container">
      <div className="links-wrapper">
        {/* <h4>Important Links</h4> */}
        {/* Safari Zones */}
        <div className="link-section">
          <h6 className="link-heading">Tadoba Safari Zones</h6>
          <ul className="link-list">
            <li><Link to="/moharli">Moharli</Link></li>
            <li><Link to="/junonagate-gate">Junona Gate</Link></li>
            <li><Link to="/khutwanda-gate">Khutwanda Gate</Link></li>
            <li><Link to="/agarzari-gate">Agarzari Gate</Link></li>
            <li><Link to="/kolara-gate">Kolara Gate</Link></li>
            <li><Link to="/navegaon-gate">Navegaon Gate</Link></li>
            <li><Link to="/zari-gate">Zari Gate</Link></li>
            <li><Link to="/safari-gate">Tadoba Safari Gates</Link></li>
            <li><Link to="/tourism-zones">Tadoba Tourism Zones</Link></li>
          </ul>
        </div>

        {/* Safari Information */}
        <div className="link-section">
          <h6 className="link-heading">Tadoba Safari</h6>
          <ul className="link-list">
            <li><Link to="">Tadoba Jeep Safari</Link></li>
            <li><Link to="/canter">Tadoba Canter Safari</Link></li>
            <li><Link to="/permit-tips">Safari Permit Tips</Link></li>
            <li><Link to="/covid-safety-tips">Covid Safety Tips</Link></li>
            <li><Link to="/things-to-do">Things to do</Link></li>
            <li><Link to="/how-to-reach">How to Reach</Link></li>
            <li><Link to="/how-to-plan">How to Plan</Link></li>
            <li><Link to="/best-time-to-visit">Best Time to Visit</Link></li>
          </ul>
        </div>

        {/* Tadoba Information */}
        <div className="link-section">
          <h6 className="link-heading">Tadoba Information</h6>
          <ul className="link-list">
            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/refund">Refund Policy</Link></li>
            <li><Link to="/climate">Tadoba Climate</Link></li>
            <li><Link to="/faq">Tadoba FAQs</Link></li>
            <li><Link to="/map">Tadoba Map</Link></li>
            <li><Link to="/flora">Tadoba Flora</Link></li>
            <li><Link to="/fauna">Tadoba Fauna</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ImportantLinks;
