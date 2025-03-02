import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import {authConfig} from "./authConfig";
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the App component with BrowserRouter */}
    <BrowserRouter>
    <KindeProvider
        domain={authConfig.domain}
        clientId={authConfig.clientId}
        redirectUri={authConfig.redirectUri}
        logoutRedirectUri={authConfig.logoutRedirectUri}
      >
      <App />
      <Toaster />
      </KindeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
