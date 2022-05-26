import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions.js";

import Product from "../component/Product.js";
import Message from "../utils/Message.js";
import Loading from "../component/Loader/LoadingSpinner.js";

const Homepage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;

  console.log(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading className="row center" />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          {products.length === 0 && <Message> No Product Found</Message>}
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
