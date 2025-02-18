import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import floraBanner from "../../assets/images/flora-banner.jpg";
import flora1 from "../../assets/images/flora1.jpg";
import flora2 from "../../assets/images/flora2.jpg";
import flora3 from "../../assets/images/flora3.jpg";
import { useEffect } from "react";
function TadobaFlora() {
  useEffect(()=>{
            window.scrollTo(0, 0);
          },[])
  return (
    <>
      <Header></Header>
      <div>
        <img src={floraBanner} className="floraBanner" alt="" />
      </div>
      <section className="leaf">
        <div className="container">
          <div>
            <h2>TADOBA NATIONAL PARK FLORA</h2>
            <p>
              Just imagine the national park without flora; it’s like fish out
              of water. Flora is the gem of the park and the forest is
              meaningless and has no virtue if there is no existence in it. The
              embellishment of the national park lies in its essentials so why
              not discover the beauty of nature amidst flora? If you have to see
              the rich botanical family then you should visit Tadoba National
              Park. They are trees, shrubs, herbs, and grasses along with their
              local names, and types of flora.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-8 col-lg-8">
              <h5>Get to know Tadoba National Park's botanical family</h5>
              <p>
                You cannot resist the enticing flora when you go through the
                Tadoba tiger reserve. You will come across grasses and bamboo
                bushes marvelously highlighted in the spaces. If wildlife
                experience is your cup of tea then go there amidst dense forests
                of Teak trees, crocodile peel, salai, tendu, karaya gum, mahua
                madhuca, and much more exotic beauty. I bet you will not get
                tired of a such fascinating collection of flora. You got to
                cover Black Plum trees' surroundings which grow lakeside, Arjun
                trees that grow at the waterhole at Panchadhara. Apart from
                this, you will come across more than a few therapeutic plants
                here like Kach Kujali which is good for treating a specific
                disease, neem, Bheria, Bija, and Beheda.
              </p>

              <h5>Entry Permitted with Covid-19 Safety Guidelines:-</h5>
              <p>
                You will love the small collection of aquatic and semi-aquatic
                hemipterans in this forest of Tadoba Andhari Tiger Reserve,
                Maharashtra along with the patches of grasses and bamboo groves
                found as widespread farms here.
              </p>
              <p>
                Have a look at the few most popular Tadoba National Park floras.
              </p>

              <h5>Bija Tree</h5>
              <p>
                This Bija tree is 30 meters tall and is also addressed as a
                pterocarpus Marsupium tree, Basically, it is found in Kerela and
                Karnataka region and is very exclusive in appearance and is
                rarely found.
              </p>
              <h5>Kusum Tree</h5>
              <p>
                This tree has very unique appearance such as a broad, shady
                crown and it basically stays widespread throughout the tropical
                Himalayas. Its red leaves are very attractive and look
                mesmerizing. Flowers are tiny but impressively beautiful with
                pairs of leaflets. March is the best time to see this flower.
              </p>
              <h5>Bark Tree</h5>
              <p>
                During winter, tree stands bare. It looks scissored and cracked,
                so it justifies its name crocodile bark tree. Diarrhoea is
                treated medicinally with the bark.
              </p>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-4">
              <img src={flora1} className="m-3 imgFlora" alt="" />
              <img src={flora2} className="m-3 imgFlora" alt="" />
              <img src={flora3} className="m-3 imgFlora" alt="" />
            </div>
          </div>

          <div>
            <h4>What is Tadoba famous for?</h4>
            <p>
              Who does not like the tiger spotting, flora, and fauna of the
              national park? Park that offers all that abundant beauty becomes
              your favorite and wandering there is solely an idea of fun and a
              certain kind of relaxation. Tadoba is meant to offer tadoba
              wildlife safari and this is what is famous for. Furthermore, you
              have the full opportunity to capture a candid view while using
              your cameras amidst the shade of pivot wood and energetic colors
              of palash. Finding such exclusive Black Plum trees, Mahua, Kusum,
              and Phetra surrounding the lakes is a very blissful moment to
              capture.
            </p>
            <p>
              Seeing the tiger is always the best thing any tourists want to
              feel at that moment. Such enlightenment and richness of the forest
              are bound to call you to be amidst the lap of nature. Other than
              these few trees which can be witnessed during the Tadoba tour
              packages comprise mahua madhuca, beheda, karaya gum, and Lannea
              Coramandelica. Among the main attractions is Axlewood Anogeissus
              latifolia. Those floral species are fire-resistant. There is
              various kind of floral symbols in Tadoba, such as Flame of the
              Forest or Butea Monosperma, or Palas, which makes the forest more
              vibrant and those flora representations are worth watching during
              a stay at a Tadoba hotel or resort.
            </p>
            <p>
              Be at the vibrant world of flora in Tadoba National Park and see
              how lucky you are for being here. These views make you feel proud
              when the surroundings are such attention-grabbing.
            </p>
          </div>
        </div>
      </section>
      <ImportantLinks></ImportantLinks>
      <Footer></Footer>
    </>
  );
}

export default TadobaFlora;
