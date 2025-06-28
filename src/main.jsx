import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { persist, store } from "./store/store.js";
import "./global.css"
import { PersistGate } from "redux-persist/integration/react";
import { ClipLoader } from "react-spinners";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<div className="loading">
          <ClipLoader size={60} color="#000" />
        </div>} persistor={persist}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
