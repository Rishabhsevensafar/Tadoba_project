import "react-responsive-carousel/lib/styles/carousel.min.css";
 import zone1 from '../assets/images/slide2.jpg'
import zone2 from '../assets/images/slide1.jpg'
import zone3 from '../assets/images/slide3.jpg'
//import "../App.css";
 
  import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
 
import React from "react";
import Slider from "react-slick";
 
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 1500,
  };
 
  return (
    <>
    <div className="bannersection">
    <div>
     
      <Slider {...settings}>
        <div >
          <img  className="imageName" src={zone1} alt="Slide 1" />
        </div>
        <div>
          <img className="imageName" src={zone2} alt="Slide 2" />
        </div>
        <div>
          <img className="imageName" src={zone3} alt="Slide 3" />
        </div>
      </Slider>
      </div>
      </div>
      </>
  );
};
 
export default Banner;