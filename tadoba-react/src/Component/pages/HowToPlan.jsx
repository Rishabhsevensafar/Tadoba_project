import React from "react";
import ImportantLinks from "../ImportantLinks";
import Header from "../Header";
import Footer from "../Footer";
import planBanner from "../../assets/images/tour-plan-banner.jpg";
import plan1 from "../../assets/images/tour-plan.jpg";
import plan2 from "../../assets/images/tour-plan2.jpg";
import rotate from "../../assets/images/rotate.png";
import { useEffect } from "react";
function HowToPlan() {
    
  return (
    <>
      <Header></Header>

      <div>
        <img
          src={planBanner}
          className="planBanner"
          alt="things banner image"
        />
      </div>
      <section className="pb-4 leaf">
        <div className="container">
          <div>
            <h1>HOW TO PLAN TADOBA NATIONAL PARK TOUR</h1>
            <p>
              Are you ready to hit the road and looking forward to have the best
              itinerary to lift your current mood? Tadoba tour itinerary is
              followed by many things from transportation to route to book your
              venues. Organizing a tour is no more time consuming as our
              hassle-free itinerary will encourage you to pack your bag and move
              in the land of tigers in no time. You'll be glad you took the time
              to plan it well and leaves no stone unturned to make a most of it.
              You got to choose destination, booked your transportation and even
              your accommodations apart from all these there are few more add on
              which you have to decide on.
            </p>
          </div>
          <div className="thingsImgBox">
            <img src={plan1} className="thingsImg" alt="things image" />
            <img src={plan2} className="thingsImg" alt="things image" />
          </div>

          <div>
            <h4>Planning a trip is easier than you think</h4>

            <p>
              Planning a trip is always overwhelming and a thought of these give
              goose bumps already. Tadoba National Park has been the true bliss
              and it is effortlessly beautiful. For the world class sighting
              planning exquisite tour with family and friends is quite feasible
              during this season. Watching the powerful cat in close proximity
              makes you feel in awe of the nature. The more you plan better the
              more things become easier and there are different itinerary
              available in our segment from fun tour to holiday tour and even
              you are free to customize your trip as per your priority.
            </p>
            <h5>To do List</h5>
            <p>
              If you separate to-do list with not to do list then you will get
              the conclusion what exactly what you have to do in Tadoba National
              Park. It will definitely save your time and energy. Let’s check
              some of the viable points that are must on the go to Tadoba
              National Park.
            </p>
            <h5>Fleshing out Wish list</h5>
            <p>
              There are many sightseeing ideas or references coming up
              repeatedly as you researched your destination. Having them on your
              brainstorming list is a great start! When you've changed your mind
              about something, you can take it off the list if you really want
              to, otherwise, keep it.
            </p>
            <h5>Activity Research</h5>
            <p>
              If you are going Tadoba National Park then you should aware of
              their USP and you must be known to the fact about jeep safari in
              Tadoba. This is must activity and I do not think it should not be
              in your list in any manner when it comes to things to do.
            </p>
            <h5>Building Itinerary</h5>
            <p>
              You can build your itinerary as well. Apart from our Tadoba tour
              packages you can have your tour customization through our agent.
              They will make new according to your wishes.
            </p>

            <h5>Suitable Clothing</h5>
            <p>
              Suitable clothing for safari is must as wild animals are allergic
              to few colors. So you should not opt for bright colors. Soft and
              subtle color will work best for the jungle safari.
            </p>
            <h5>Seasonal Pick</h5>
            <p>
              The best thing can be that you plan your trip and its all
              essentials according to the season. The things vary season to
              season so whatever you are packing keep in your mind first thing
              that in which season you are going for Tadoba National Park tour.
            </p>

           
          </div>
        </div>
      </section>

      <ImportantLinks />
      <Footer />
    </>
  );
}

export default HowToPlan;
