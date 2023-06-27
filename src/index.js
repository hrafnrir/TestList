import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./model/store.js";

import App from "./App.jsx";

import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
