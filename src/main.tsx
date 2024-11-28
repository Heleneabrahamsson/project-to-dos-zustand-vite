import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";
import "./index.css";

const rootElement = document.getElementById("root");

// Check if rootElement is non-null before calling `createRoot`
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Ensure the element with id 'root' exists in your HTML.");
}
