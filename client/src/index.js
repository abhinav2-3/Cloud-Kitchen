import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./Context/ProductContext";
import CartProvider from "./components/ContextReducer";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AppProvider>
);
