import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// tailwind.css -> index.css -> main.tsx
import "./css/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
