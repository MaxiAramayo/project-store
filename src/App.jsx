import "./App.css";
import { Routes, Route } from "react-router-dom";
import ShoopingCart from "./components/ShoppingCart";
import Ventas from "./routes/Ventas";
import { useState } from "react";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<ShoopingCart />} />
        <Route path="/Venta" element={<Ventas />} />
      </Routes>
    </>
  );
}

export default App;
