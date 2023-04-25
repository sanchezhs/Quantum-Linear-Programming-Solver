import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import { ScrollContextProvider } from "./context/ScrollContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { CookiesProvider } from 'react-cookie';
import './main.css'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
    <AppContextProvider>
      <ScrollContextProvider>
        <CookiesProvider>
        <App />
        </CookiesProvider>
      </ScrollContextProvider>
    </AppContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
