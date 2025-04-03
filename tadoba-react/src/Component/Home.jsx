import React from 'react'
import Header from './Header'
import Footer from './Footer'
import About from './About'
import Banner from './Banner'
import TadobaZones from './TadobaZones'
import Conservation_Chronology from './Conservation_Chronology'
import TourPackages from './TourPackages'
import TadobaHistory from './TadobaHistory'
import NewsBlogs from './NewsBlogs'
import ImportantLinks from './ImportantLinks'
import GeographicalDetails from './GeographicalDetails'
import Tourism from './tourism'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import zone1 from '../assets/images/slide2.jpg'
import zone2 from '../assets/images/slide1.jpg'
import zone3 from '../assets/images/slide3.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Home() {

    

    
    return (
        <> 
        <Header/>
        <Banner/>
        <About/>
        <TadobaZones/>
        <Conservation_Chronology/>
        <TourPackages/>
        <TadobaHistory/>
        <Tourism/>
        <GeographicalDetails/>  
        <NewsBlogs></NewsBlogs>
        <ImportantLinks></ImportantLinks>  
        <Footer/>
        </>
    )
}

export default Home
