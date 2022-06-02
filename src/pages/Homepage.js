import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions.js";

import Product from "../component/Product.js";
import Message from "../utils/Message.js";
import Loading from "../component/Loader/LoadingSpinner.js";
import CartTray from "../component/CartTray.js";

const Homepage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;

  console.log(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const cart = useSelector((state) => state.cart);
  console.log(cart.cartItems);

  return (
    <>
      {loading ? (
        <Loading className="row center" />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products.length === 0 && <Message> No Product Found</Message>}
          {cart.cartItems.length !== 0 ? <CartTray /> : null}
          <div className="row-grid center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Homepage;
