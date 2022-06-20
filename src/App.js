import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import PageNotFound from "./pages/PageNotFound.js";
import Header from "./component/Header.js";
import Footer from "./component/Footer.js";
import ProductDetailsPage from "./pages/ProductDetailsPage.js";
import CartItem from "./pages/CartItems.js";
import SignInPage from "./pages/SignInPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import UserList from "./pages/UserList";

import PrivateRoute from "./component/PrivateRoute.js";
import AdminRoute from "./component/AdminRoute.js";
import ProductList from "./pages/ProductList.js";
import ProductEditpage from "./pages/ProductEditpage.js";
import UserEditpage from "./pages/UserEditpage.js";
import Dashboard from "./pages/Dashboard.js";
import Profilepage from "./pages/Profilepage.js";

export const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />

          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route
            path="/product/:id/edit"
            element={
              <AdminRoute>
                <ProductEditpage />
              </AdminRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profilepage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart/:id"
            element={
              <PrivateRoute>
                <CartItem />
              </PrivateRoute>
            }
          />

          <Route
            path="/userlist"
            element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            }
          />
          <Route
            path="/user/:id/edit"
            element={
              <AdminRoute>
                <UserEditpage />
              </AdminRoute>
            }
          />

          <Route
            path="/productlist"
            element={
              <AdminRoute>
                <ProductList />
              </AdminRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
