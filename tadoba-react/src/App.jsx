import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import Aboutpage from "./Component/pages/Aboutpage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "./Component/Home";
import Moharli from "./Component/pages/Moharli";
import AgarzariGate from "./Component/pages/AgarzariGate";
import { Link } from "react-router-dom";
import JunonaGate from "./Component/pages/JunonaGate";
import KhutwandaGate from "./Component/pages/KhutwandaGate";
import KolaraGate from "./Component/pages/KolaraGate";
import NavegaonGate from "./Component/pages/NavegaonGate";
import ZariGate from "./Component/pages/ZariGate";
import SafariGate from "./Component/pages/SafariGate";
import Tourismzone from "./Component/pages/Tourismzone";
import CanterSafari from "./Component/pages/CanterSafari";
import PermitTips from "./Component/pages/PermitTips";
import CovidPage from "./Component/pages/CovidPage";
import ThnigsToDo from "./Component/pages/ThnigsToDo";
import HowToReach from "./Component/pages/HowToReach";
import HowToPlan from "./Component/pages/HowToPlan";
import TimeToVisit from "./Component/pages/TimeToVisit";
import TermandCondition from "./Component/pages/TermandCondition";
import PrivacyPolicy from "./Component/pages/PrivacyPolicy";
import Refund from "./Component/pages/Refund";
import Climate from "./Component/pages/Climate";
import TadobaFaqs from "./Component/pages/TadobaFaqs";
import TadobaMap from "./Component/pages/TadobaMap";
import TadobaFlora from "./Component/pages/TadobaFlora";
import TadobaFauna from "./Component/pages/TadobaFauna";
import SafariBooking from "./Component/pages/SafariBooking";
import TravellerDetails from "./Component/pages/TravellerDetails";
import TourPackage from "./Component/pages/TourPackage";
import PaymentSuccess from "./Component/Paymentsucessful";
import TourPackageDetail from "./Component/pages/TourPackageDetail";
import HotelPage from "./Component/pages/HotelPage";
import HotelDetails from "./Component/pages/HotelDetails";
import ReviewBookingHotel from "./Component/pages/ReviewBookingHotel";
import PaymentPage from "./Component/pages/PaymentPage";
import ReviewBookingTour from "./Component/pages/ReviewBookingTour";
import ContactUs from "./Component/pages/ContactUs";
import TestTailwind from "./Component/tailwindtest";
import NewsBlogDetail from "./Component/pages/NewsBlogDetail";
import SafariBookingSuccess from "./Component/pages/SafariBookingSuccess";
// import HeroSection from './Component/HeroSection';

const BASE_URL = "http://localhost:5000"; // ✅ make this .env later if needed

function App() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/global-setting`)
      .then((res) => setSettings(res.data))
      .catch((err) => console.error("Failed to fetch global settings", err));
  }, []);

  if (!settings) return null; // or <Loading />

  return (
    <>
      {/* ✅ Helmet for SEO */}
      <Helmet>
        <title>{settings.metaTitle || "Tadoba Wildlife"}</title>
        <meta name="description" content={settings.metaDescription} />
        <meta name="keywords" content={settings.metaKeywords} />
        <link rel="icon" href={`${BASE_URL}${settings.faviconUrl}`} />

        {/* OG tags */}
        <meta property="og:title" content={settings.metaTitle} />
        <meta property="og:description" content={settings.metaDescription} />
        <meta
          property="og:image"
          content={`${BASE_URL}${settings.ogImageUrl}`}
        />

        {/* Analytics (if any) */}
        {settings.analyticsScript && (
          <script
            dangerouslySetInnerHTML={{ __html: settings.analyticsScript }}
          ></script>
        )}
      </Helmet>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/moharli" element={<Moharli />} />
          <Route path="/agarzari_gate" element={<AgarzariGate />} />
          <Route path="/junonagate_gate" element={<JunonaGate />} />
          <Route path="/khutwanda_gate" element={<KhutwandaGate />} />
          <Route path="/kolara_gate" element={<KolaraGate />} />
          <Route path="/navegaon_gate" element={<NavegaonGate />} />
          <Route path="/zari_gate" element={<ZariGate />} />
          <Route path="/safari_gate" element={<SafariGate />} />
          <Route path="/tourism_zones" element={<Tourismzone />} />
          <Route path="/canter" element={<CanterSafari />} />
          <Route path="/permit_tips" element={<PermitTips />} />
          <Route path="/covid_safety_tips" element={<CovidPage />} />
          <Route path="/things_to_do" element={<ThnigsToDo />} />
          <Route path="/how_to_reach" element={<HowToReach />} />
          <Route path="/how_to_plan" element={<HowToPlan />} />
          <Route path="/best_time_to_visit" element={<TimeToVisit />} />
          <Route path="/terms_conditions" element={<TermandCondition />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/climate" element={<Climate />} />
          <Route path="/faq" element={<TadobaFaqs />} />
          <Route path="/map" element={<TadobaMap />} />
          <Route path="/flora" element={<TadobaFlora />} />
          <Route path="/fauna" element={<TadobaFauna />} />
          <Route path="/safaribooking" element={<SafariBooking />} />
          <Route path="/travellerdetail" element={<TravellerDetails />} />
          <Route path="/tourpackage" element={<TourPackage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route
            path="/tourpackagedetail/:id"
            element={<TourPackageDetail />}
          />
          <Route path="/hoteldetail/:id" element={<HotelDetails />} />
          <Route path="/hotelpage" element={<HotelPage />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
          <Route path="/reviewbookinghotel" element={<ReviewBookingHotel />} />
          <Route path="/booking/:id" element={<ReviewBookingTour />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/tailwindtest" element={<TestTailwind />} />
          <Route path="/news-blog-detail/:id" element={<NewsBlogDetail />} />
          <Route
            path="/booking-success/:bookingId"
            element={<SafariBookingSuccess />}
          />

          {/* <Route path="/Route-hero" element= {<HeroSection/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
