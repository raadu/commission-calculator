import React from "react";
import ReactDOM from "react-dom/client";
import RootComponent from "components/RootComponent";
import reportWebVitals from "./reportWebVitals";
import "styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
);

reportWebVitals();
