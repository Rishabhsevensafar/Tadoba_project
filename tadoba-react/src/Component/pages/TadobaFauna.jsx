import React from "react";
import Header from "../Header";
import ImportantLinks from "../ImportantLinks";
import Footer from "../Footer";
import faunaBanner from "../../assets/images/fauna-banner.jpg";
import fauna1 from "../../assets/images/fauna2.jpg";
import fauna2 from "../../assets/images/fauna3.jpg";
import fauna4 from "../../assets/images/fauna1.jpg";
import fauna3 from "../../assets/images/fauna4.jpg";
import { useEffect } from "react";
function TadobaFauna() {
  useEffect(()=>{
            window.scrollTo(0, 0);
          },[])
  return (
    <>
      <Header />
      <div>
        <img src={faunaBanner} className="faunaBanner" alt="Fauna banner image" />
      </div>
      <section className="leaf">
        <div className="container">
          <div>
            <h2>TADOBA NATIONAL PARK FAUNA</h2>
            <p>
              It is not surprising to say that fauna makes a huge difference
              when it comes to wildlife. Without fauna and wildlife safari any
              national park visit is incomplete. If your interest is more in
              fauna and wildlife than beaches and mountains then your next
              exploration should be at Tadoba National Park. The land of the
              Royal Bengal Tiger is spread across 625 sq. km. Full of animals
              belong to Tadoba. The park has many specified mammals and they are
              sloth bear, jungle cat, sambar, Indian leopard, nilgai, honey
              badger, small Indian civet, barking deer, striped hyena, chital,
              gaur, dhole, spotted deer, chausingha, wild boar, porcupines,
              common langurs, Indian pangolins, flying squirrel, chinkara, blue
              bull, wolf, jackal, fox, rhesus macaque, rusty-spotted cat,
              leopard cat and many more.
            </p>
            <p>
              Get to know the fauna and be familiar with the mammals of Tadoba
              National Park
            </p>
          </div>
          <div>
            <div className="row">
              <div className="col-sm-12 col-md-8 col-lg-8">
                <h5>Tadoba’s Royal Bengal Tiger</h5>
                <p>
                  It would be a sin for a few travelers being here in Tadoba and
                  not able to spot Royal Bengal Tigers. They are most in demand
                  and on the top priority list when it comes to exploring the
                  wilderness in full swing. Tadoba has all the good sides and
                  makes you meet with all the desirable fauna. You deserve to
                  spot them so with the guide's help things will be easier.
                </p>

                <h5>Tadoba’s Birds</h5>
                <p>
                  If birds sighting hits you differently and seeing them in
                  appearance is the ultimate thing for you then Tadoba is the
                  place for you. Birds are available in different ranges and you
                  feel love at the first sight watching them vigorously. All
                  kinds of birds in different colors with different shapes and
                  sizes can be found in Tadoba bird-watching zones. Tadoba
                  jungle got you covered with an abundance of Grey-headed fish
                  eagle, Crested serpent eagle, Changeable hawk-eagle, Asian
                  Paradise flycatcher, Indian pitta, peacock, Black-naped blue
                  flycatcher, warblers, Stone curlew, Orange-Headed Thrush,
                 
                </p>
                <p> Crested Treeswift, Crested Honey Buzzard, Bronze-Winged
                  Jacana, Lesser Golden-backed Woodpecker, shy jungle fowl,
                  Malabar pied hornbill, Indian scimitar babbler, painted
                  Francolin, Tickell’s blue flycatcher, golden oriole, mottled
                  wood owl, brown fish owl, plum headed parakeet, Gray jungle
                  fowl, drongos, larks, munias, Bonelli’s eagle, pipits and lot
                  more.</p>

                <h5>Tadoba's Reptiles</h5>
                <p>
                  Reptiles are attracted to watering holes like crocodiles.
                  Also, home to the common Indian monitor, the Indian star
                  tortoise, Russel's viper, the Indian python, the terrapin, the
                  Indian cobra, the krait, the tree snake, the leaf-nosed snake,
                  and a lot more. There is a dearth of reptiles here so finding
                  them often is quite feasible.
                </p>
                <h5>Tadoba’s Insects</h5>
                <p>
                  Tadoba’s dense forest is full of mammals and witnessing unique
                  insects is truly something you will enjoy watching over and
                  over. Though, without a guide, you won’t able to spot all
                  these exciting and phenomenal insects. They are vibrant in
                  color and make you watch them longer. Spiders and butterflies
                  are kids’ favorites and they will get an extra edge finding
                  them in natural surroundings.phenomenal insects. They are vibrant in
                  color and make you watch them longer.
                  phenomenal insects. They are vibrant in
                  color and make you watch them longer.
                </p>
                <p>
                  You are sure to enjoy the beautiful fauna of Tadoba National
                  Park. Get yourself all set for the Tadoba jeep safari for the
                  fun meet with all the wonderful mammals.
                </p>
              </div>
              <div className="col-sm-12 col-md-4 col-lg-4">
                <img src={fauna1} className="m-3 imgFlora" alt="" />
                <img src={fauna2} className="m-3 imgFlora" alt="" />
                <img src={fauna4} className="m-3 imgFlora" alt="" />
                {/* <img src={fauna3} className="m-3 imgFlora" alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ImportantLinks />
      <Footer />
    </>
  );
}

export default TadobaFauna;
