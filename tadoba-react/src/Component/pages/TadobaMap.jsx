import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import mapBanner from "../../assets/images/map-banner.jpg";
import tadobaMap from "../../assets/images/tadobamap.jpg"
import { useEffect } from "react";
function TadobaMap() {
  useEffect(()=>{
            window.scrollTo(0, 0);
          },[])
  return (
    <>
      <Header />
      <div>
        <img src={mapBanner} className="imgMapBanner" alt="Map banner image" />
      </div>
      <section className="leaf">
        <div className="container">
          <div>
            <h2>TADOBA NATIONAL PARK MAP</h2>
            <h4>Overview of Tadoba National Park Map</h4>
            <p>
              Tadoba National Park Map will guide you better and inform you of
              the different routes. The map contains all information on
              geography or every location. In 1993, Tadoba National Park and the
              Andhari Wildlife Sanctuary were merged to form the Tadoba-Andhari
              Tiger Reserve (TATR), covering an area of 622.87 square
              kilometers. Be familiar with unreachable areas and their
              connectivity and interconnectivity. The map of Tadoba National
              Park provides a detailed layout of its rich biodiversity, key
              entry points, and significant landmarks. It is an essential guide
              for visitors to navigate the park's vast and diverse landscape,
              ensuring a fulfilling wildlife experience.
            </p>
          </div>
          <div>
            <h4>Geographical Features:</h4>
            <ul>
                <li>Location: Chandrapur district, Maharashtra, India</li>
                <li>Total Area: 622.87 sq km</li>
                <li>Key Zones: Tadoba range (North), Andhari range (South)</li>
            </ul>
            <img src={tadobaMap}  alt="tadoba map image" />
          </div>
<section>
          <div >
            <h4 >Entry Gates</h4>
            <table className="mt-3 table table-bordered">
  <thead className="table-secondary table-bordered">
   <tr>
      <th scope="col">Core Zone Entry</th>
      <th colspan="1">Buffer Zone Entry</th>
      <th scope="col"></th>
    </tr>    
  </thead>
  <tbody>
    <tr>
     
      <td >Moharli</td>
      <td>Agarzari</td>
      <td>Zari/Peth</td>
    </tr>
    <tr>
      <td>Khutwanda</td>
      <td>Devada-Adegaon</td>
      <td>Palasgaon</td>
    </tr>
    <tr>
     
      <td>Kolara</td>
      <td>Junona</td>
      <td>Kolara Chauradeo</td>
    </tr>
    <tr>
     
      <td>Navegaon</td>
      <td>Ramdegi-Navegaon</td>
      <td>Kesalghat</td>
    </tr>
    <tr>
     
      <td>Zari</td>
      <td>Madnapur</td>
      <td>Nimdela</td>
    </tr>
    <tr>
     
      <td>Pangadi</td>
      <td>Mamla</td>
      <td>Belara</td>
    </tr>
    <tr>
     
      <td></td>
      <td>Pangadi Aswal Chuha Gate</td>
      <td>Alizanza</td>
    </tr>
    <tr>
     
      <td></td>
      <td>Sirkada</td>
      <td>Adegaon</td>
    </tr>
  </tbody>
</table>
  </div>
  </section>
<section>
  <div className="">
    <h4>Key Landmarks</h4>
    <table class="table table-bordered mt-3">
  <thead className="table-secondary">
    <tr>
      <th scope="col">Landmark</th>
      <th colSpan="3">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tadoba Lake</td>
      <td colSpan="3">Central water source, popular for wildlife sightings.</td>
    </tr>
    <tr>
      <td>Telia Lake</td>
      <td colSpan="3">Known for frequent tiger and bird sightings.</td>
    </tr>
    <tr>
      <td>Pandharpauni</td>
      <td colSpan="3">Renowned for spotting large carnivores and herbivores.</td>
    </tr>
    <tr>
      <td>Moharli Zone</td>
      <td colSpan="3">High chances of tiger sightings.</td>
    </tr>
    <tr>
      <td>Kolara Gate</td>
      <td colSpan="3">The most visited entry gate of Tadoba is only 99 km from Nagpur.</td>
    </tr>
    </tbody>
    </table>
  </div>
  </section>

  <section>
  <div className="">
    <h4>Safari Zones</h4>
    <table className="table table-bordered mt-3">
  <thead className="table-secondary">
    <tr>
      <th scope="col">Zones</th>
      <th colSpan="3">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Moharli</td>
      <td colSpan="3">Moharli Gate, in the Moharli zone of Tadoba National Park, is popular for its frequent tiger sightings and rich wildlife. It offers an unmatched safari experience, making it one of India's top wildlife reserves.</td>
    </tr>
    <tr>
      <td>Pangadi and Zari</td>
      <td colSpan="3">Located in the central part of Tadoba National Park, this zone offers numerous accommodation options with essential facilities. Also well-linked with other safari zones.</td>
    </tr>
    <tr>
      <td>Navegaon</td>
      <td colSpan="3">The Navegaon zone is a top core area in Tadoba National Park, offering clear trails, unique species, and peaceful surroundings. Limited daily safari permits are available, with six vehicles allowed in the morning and evening.</td>
    </tr>
    <tr>
      <td>Kolara</td>
      <td colSpan="3">This zone combines joy and adventure, with high tiger density and a prime location between Navegaon and Moharli, making it the park's second most popular area.</td>
    </tr>
    </tbody>
    </table>
  </div>
  </section>
<div>
    <h4>Points of Interest:</h4>
    <ul>
        <li>Tadoba Lake: Central location, often a starting point for safaris</li>
        <li>Andhari River: Flows through the reserve, creating a natural boundary between the two ranges.</li>
        <li>Erai Dam: Erai Dam in Tadoba National Park is a crucial water reservoir that supports the park's diverse wildlife and lush      landscapes.</li>
    </ul>
</div>

        </div>
      </section>
      <ImportantLinks />
      <Footer />
    </>
  );
}

export default TadobaMap;
