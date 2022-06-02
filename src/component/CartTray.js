import React from "react";
import { Link } from "react-router-dom";

import { FiShoppingBag } from "react-icons/fi";
import { BsBagFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const CartTray = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Link to="/cart">
      <span className="cart_trey">
        <BsBagFill className="cart_trey_icon" size="20" />
        <span className="cart_counter">{cartItems.length}</span>
      </span>
    </Link>
  );
};

export default CartTray;
