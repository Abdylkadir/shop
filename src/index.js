import React from "react";
import { createRoot } from "react-dom/client";

import store, { persistor } from "@store/store";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import "./styles/index.css";

import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
