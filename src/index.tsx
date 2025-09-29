import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./styles/variables.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<React.StrictMode>👋Hey</React.StrictMode>);
