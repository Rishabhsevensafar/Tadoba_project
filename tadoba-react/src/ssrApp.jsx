import React from "react";
import AppRoutes from "./AppRoutes";
import { StaticRouter } from "react-router-dom/server";

const SSRApp = ({ url }) => (
  <StaticRouter location={url}>
    <AppRoutes />
  </StaticRouter>
);

export default SSRApp;
