import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './custom.scss';
import "./index.css";
import AppAdmin from "../admin/AppAdmin.jsx";

const isAdmin = window.location.pathname.startsWith("/admin");
hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
 {isAdmin ? <AppAdmin /> : <App router={null} />}
  </BrowserRouter>
);