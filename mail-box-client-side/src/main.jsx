import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from "react-router-dom";

import {Provider} from "react-redux"
import Store from "./redux/Store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={Store}>
      <App />
      </Provider>  
    </BrowserRouter>
  </StrictMode>
);
