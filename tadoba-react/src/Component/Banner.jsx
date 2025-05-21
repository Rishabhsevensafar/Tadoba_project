import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/herosection/get-banner");
        setBanners(response.data.banner?.images || []);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  if (!isMounted || banners.length === 0) {
    return <div className="bannersection">Loading...</div>;
  }

  return (
    <div className="bannersection">
      <Slider {...settings}>
        {banners.map((img, index) => (
          <div key={index}>
            <img 
              src={`http://localhost:5001${img}`} 
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;