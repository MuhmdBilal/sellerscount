import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchState from "./context/searchContext";
import ProfitState from "./context/ProfitContext";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <SearchState>
      <ProfitState>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </ProfitState>
    </SearchState>
);

reportWebVitals();
