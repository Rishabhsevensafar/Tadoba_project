import React from "react";
import App from "./App"; // ✅ this will pull in full layout + settings
import { StaticRouter } from "react-router-dom/server";
import AppRoutes from "./AppRoutes";

const SSRApp = ({ url }) => (
  <StaticRouter location={url}>
    <App router={<AppRoutes />} />
  </StaticRouter>
);

export default SSRApp;
