// src/main.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import "./index.css";  // Make sure your CSS is imported here
import "./styles.css"; // If you're using Tailwind CSS styles

const root = createRoot(document.getElementById("root"));
root.render(<App />);
