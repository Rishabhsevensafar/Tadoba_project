import React from "react";

function Tourism() {
  return (
    <section className="tourism-container">
      <div className="tourism-grid">
        
        {/* Left Section (Core & Buffer Zones) */}
        <div className="tourism-info">
          <div className="tourism-card">
            <h4>Types of Safari Tourism Zone</h4>
            <p>
              <span>Core Zones - </span>The Tadoba Core Zone is the heart of
              Tadoba National Park, famous for its dense forests, abundant
              biodiversity, and frequent tiger sightings. This zone represents
              the true wilderness of the park, with no human habitation allowed.
              It is a crucial area where wildlife and natural resources are
              carefully conserved. The entry gates to the Tadoba Core Zone
              include Moharli, Kolara, Khutwanda, Navegaon, Zari, and Pangadi.
            </p>
            <p>
              <span>Buffer Zones - </span>The buffer zone, surrounding the core
              area of Tadoba National Park, is where villages coexist with
              wildlife and play a crucial role in tourism. Unlike the core zone,
              the buffer zone remains accessible year-round, including the
              monsoon season. The entry gates of Tadoba buffer zones include
              Agarari, Devada-Adegaon, Ramdegi, Navegaon, Madnapur, Mamla,
              Pangadi Aswal Chuha Gate, Srikada, Zari/Peth, Palasgaon, Klara
              Chauradeo, Kesalghat, Nimdela-Ramdegi, Belara, Alizanza, and
              Adegaon.
            </p>
          </div>
        </div>

        {/* Right Section (Safari Details) */}
        <div className="safari-info">
          <h5>Jeep Safari Jungles of Tadoba :</h5>
          <p>
          If you wish to explore the dense jungle of Tadoba National Park
              then Open Jeep Safari is the most feasible option to travel inside
              the park. Four wheeler open gypsy takes you to the core and buffer
              tourism zone of the park. Its bio-diversity is unique and
              definitely you will love sighting apart from Royal Bengal Tigers
              and different species of reptiles and mammals. Tadoba is an abode
              of 74 types of colourful butterflies and more than 190 species of
              avifauna.
          </p>

          <h5>Canter Safari (Offline Booking Only)</h5>
          <p>
          This is a universal safari in which 22 people can be accommodated
              at a time.This shared safari or Canter is an open big bus in which
              there are 2 guides in the canter. Canters are the cost-effective
              option for safari in the Tadoba National Park. Online booking is
              not availabe and only offline booking is availabe on the spot at
              MTDC Counter Moharli or Kolara Gate, most visited zones in Tadoba.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Tourism;
