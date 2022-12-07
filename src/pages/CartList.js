import React from "react";
import { useSelector } from "react-redux";

const CartList = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <ul>
      {cart.cartItems.map((x, index) => (
        <li key={x.productId}>
          <div>
            <p>
              <b>{index + 1} : </b> &nbsp;
              {x.name}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
