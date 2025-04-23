import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./AppRoutes";
import FloatingEnquiry from "./Component/GeneralEnquiry";
// import "bootstrap/dist/js/bootstrap.bundle.min";

const BASE_URL = "http://localhost:5000"; // ✅ make this .env later if needed

function App(props) {
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
      <FloatingEnquiry/>
      {React.isValidElement(props.router) ? (
        props.router
      ) : (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
