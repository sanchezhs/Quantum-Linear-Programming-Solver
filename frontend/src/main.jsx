import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import { ScrollContextProvider } from "./context/ScrollContext";
import './main.css'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <ScrollContextProvider>
        <App />
      </ScrollContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
