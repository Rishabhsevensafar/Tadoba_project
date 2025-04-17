import React from "react";
import { hydrateRoot } from "react-dom/client";
import './custom.scss';
import App from "./App.jsx";
import AppAdmin from "../admin/AppAdmin.jsx";

const isAdmin = window.location.pathname.startsWith("/admin");

hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    {isAdmin ? <AppAdmin /> : <App router={null} />}
  </React.StrictMode>
);
