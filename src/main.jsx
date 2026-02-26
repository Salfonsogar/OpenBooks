import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store/store";
import {Provider} from 'react-redux'
import { loadFromSession } from './features/auth/store/authSlice';

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);

try {
  store.dispatch(loadFromSession());
} catch {
  // ignore
}