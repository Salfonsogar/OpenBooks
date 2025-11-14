import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import {Provider} from 'react-redux'
import { loadFromSession } from './store/authSlice';

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-local-epubs.js').then(() => {
    console.log('sw-local-epubs registrado');
  }).catch((err) => {
    console.warn('no se pudo registrar sw-local-epubs:', err);
  });
}

try {
  store.dispatch(loadFromSession());
} catch {
  // ignore
}