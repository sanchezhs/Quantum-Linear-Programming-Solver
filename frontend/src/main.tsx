import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";
import "./main.css";
import 'react-sliding-side-panel/lib/index.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AppContextProvider>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </AppContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
