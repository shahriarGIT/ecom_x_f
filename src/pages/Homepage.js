import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions.js";

import Product from "../component/Product.js";
import Loading from "../component/Loader/LoadingSpinner.js";
import CartTray from "../component/CartTray.js";
import Message from "../component/Message.js";
import Pagination from "../component/Pagination.js";
import { useParams } from "react-router-dom";
import CartList from "./CartList.js";

const Homepage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.signIn);

  const { products, page, totalPages, error, loading } = productList;

  let {
    name = "all",
    category = "all",
    order = "newest",
    pageNumber = 1,
  } = useParams();

  const getFilteredURL = (filter) => {
    const filteredName = filter.name || name;
    const filteredCategory = filter.category || category;
    const sortOrder = filter.order || order;
    const page = filter.page || pageNumber;

    return `/pageNumber/${page}/name/${filteredName}/category/${filteredCategory}/order/${sortOrder}`;
  };

  useEffect(() => {
    dispatch(
      getAllProducts({
        pageNumber,
      })
    );
  }, [dispatch, pageNumber]);

  return (
    <>
      {loading ? (
        <Loading className="row center" />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products.length === 0 && <Message> No Product Found</Message>}
          {userInfo && cart.cartItems.length !== 0 ? <CartTray /> : null}
          {/* <div>sort dropdown</div> */}
          <div className="row-grid center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            products={products}
            getFilteredURL={getFilteredURL}
          />
        </>
      )}
    </>
  );
};

export default Homepage;
