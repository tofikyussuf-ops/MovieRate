import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Make sure this path is correct!
import App from "./App-v3";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
