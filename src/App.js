import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import PageNotFound from "./pages/PageNotFound.js";
import Header from "./component/Header.js";
import Footer from "./component/Footer.js";
import ProductDetailsPage from "./pages/ProductDetailsPage.js";
import CartItem from "./pages/CartItems.js";

export const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartItem />} />
          <Route path="/cart/:id" element={<CartItem />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
