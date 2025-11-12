import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-local-epubs.js').then(() => {
    console.log('sw-local-epubs registrado');
  }).catch((err) => {
    console.warn('no se pudo registrar sw-local-epubs:', err);
  });
}