import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import About from './About';
import TadobaZones from './TadobaZones';
import Conservation_Chronology from './Conservation_Chronology';
import TourPackages from './TourPackages';
import TadobaHistory from './TadobaHistory';
import NewsBlogs from './NewsBlogs';
import ImportantLinks from './ImportantLinks';
import GeographicalDetails from './GeographicalDetails';
import Tourism from './tourism';
import Banner from './Banner';

function Home() {
//   const [Banner, setBanner] = useState(null);

//   useEffect(() => {
//     import('./Banner').then((mod) => setBanner(() => mod.default));
//   }, []);

return (
    <>
    <Header/>
    <Banner />
    <About/>
    <TadobaZones/>
    <Conservation_Chronology/>
    <TourPackages/>
    <TadobaHistory/>
    <Tourism/>
    <GeographicalDetails/>
    <NewsBlogs/>
    <ImportantLinks/>
    <Footer/>
    </>
);
}

export default Home;
