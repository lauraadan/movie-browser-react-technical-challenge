import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { InitialDataProvider } from "./app/context/initialDataContext/initialData";

declare global {
  interface Window {
    __INITIAL_STATE__?: any;
  }
}

const initial = window.__INITIAL_STATE__ || {};

hydrateRoot(
  document.getElementById("root")!,
  <React.StrictMode>
    <InitialDataProvider value={initial}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InitialDataProvider>
  </React.StrictMode>
);
