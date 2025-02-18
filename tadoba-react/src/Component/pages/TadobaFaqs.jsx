import React, { useState } from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import faqBanner from "../../assets/images/faq-banner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const faqsData = [
  {
    question: "1. Can I see Tiger in Tadoba?",
    answer:
      "We have been very lucky with the sighting of tigers in Tadoba. Tadoba is gradually becoming the most active national park with more and more tigers. But sightings of tigers can be subjective too as it depends on your time to visit or climate conditions or your guide and other things.",
  },
  {
    question: "2. Is Tadoba the best place to visit and why?",
    answer:
      "Yes, Tadoba is one of the best national parks and explorer’s first choice when they have to spot tigers. Tourists are of different moods and different personalities and their requirements vary to each other so Tadoba offers beauty with wildlife in abundance and has something for all. Children will enjoy being here most.",
  },
  {
    question: "3. Can I think of extra safaris at the last minute when I will be at my resort?",
    answer: 
    "If you have to make the most of Tadoba National Park then always do advance booking. It makes you clear about everything and so advance booking is always a wise decision for the best experience and stay problem free. There is no dearth of availability of safaris so book as much as you can."
  },
  {
    question: "4. What is the best time to visit Tadoba National Park?",
    answer: "Best season in Tadoba is from October to June. You can have the more variants of the park and drool over some exotic time with the scenic view. For spotting tigers the best time to stopover would be March to June. This time has a dry and hot season and the summer makes the wild creature come out from their habitat for drinking water."
  },
  {
    question:"5. How Can I Book Elephant and Jeep Safari for Tadoba National Park?",
    answer: "There are only jeep and canter safari available in Tadoba. So do advance booking for the ideal trip to Tadoba without any problems. All you need to submit your details Name, age, Gender and date of traveling booking confirmation. For instant booking please visit: https://www.tadobanationalparkonline.in/"
  },
];

function TadobaFaqs() {
  const [openIndex, setOpenIndex] = useState(null); // Store the index of the open FAQ

  const toggleVisible = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open state
  };
  return (
    <>
      <Header></Header>
      <div>
        <img className="faqBanner" src={faqBanner} alt="refund banner image" />
      </div>
      <section className="leaf pb-5">
        <div className="container">
          <div>
            <h2>TADOBA NATIONAL PARK FAQs</h2>
            <p>
              Indian safari destination leaves no stone unturned in impressing
              wanderlust. It has very different vibes than traveling to the city
              or beaches. In India the national parks are in huge numbers and
              their specialty makes them unique from each other. There are
              numerous national parks and every national park has certain rules
              and regulations. All national parks are designed in a way that you
              will adore their wildlife and flora and fauna in abundance.
            </p>
            <h4>FAQs</h4>
            <p>
              Indian safari destination leaves no stone unturned in impressing
              wanderlust. It has very different vibes than traveling to the city
              or beaches. In India the national parks are in huge numbers and
              their specialty makes them unique from each other.
            </p>

            <div>
              {faqsData.map((faq, index) => (
                <div className="my-2" key={index}>
                  <div className="faqs">
                    <h6 className="questionFaq">{faq.question}</h6>
                    <div
                      onClick={() => toggleVisible(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {openIndex === index ? (
                        <FontAwesomeIcon
                          className="questionFaq"
                          icon={faCircleXmark}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="questionFaq"
                          icon={faCheck}
                        />
                      )}
                    </div>
                  </div>
                  {openIndex === index && (
                    <div className="faqanswer">
                      <p className="">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

         
          </div>
        </div>
      </section>

      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default TadobaFaqs;
