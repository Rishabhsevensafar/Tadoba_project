import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/herosection/get-banner");
        setBanners(response.data.banner?.images || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
  
    fetchBanners();
  }, []);
  

  return (
    <div className="bannersection">
      <Slider {...settings}>
        {banners.map((img, index) => (
          <div key={index}>
            <img
              className="imageName"
              src={`http://localhost:5000${img}`} // or full URL if already complete
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
