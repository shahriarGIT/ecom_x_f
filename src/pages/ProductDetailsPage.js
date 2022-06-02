import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import { getProductDetails } from "../redux/actions/productActions.js";

import Loader from "../component/Loader/LoadingSpinner.js";
import Card from "../component/Card.js";
import Message from "../utils/Message.js";

export const ProductDetailsPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = params;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const [qty, setQty] = useState(1);

  console.log(product, loading, error);
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  const goToCardScreen = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  let bodyContent = (
    <>
      <div className="col-2">
        {!loading && (
          <img className="medium" src={product.image} alt={product.name} />
        )}
      </div>
      <div className="col-1">
        {!loading && (
          <Card>
            <p>
              <b>{product.name}</b>
            </p>
            <p> Description : {product.price}</p>
            <p> Description : {product.description}</p>
          </Card>
        )}
      </div>
      <div className="col-1">
        {!loading && (
          <Card>
            <ul>
              <li>
                <p>Product id - {productDetails.product.name}</p>
              </li>
              <li>
                Quality -{" "}
                {product.countInStock > 0 ? (
                  <select value={qty} onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p>Out of Stock</p>
                )}
              </li>
              <li>
                {product.countInStock > 0 ? (
                  <button onClick={goToCardScreen} className="primary block">
                    Add To Cart
                  </button>
                ) : null}
              </li>
            </ul>
          </Card>
        )}
      </div>
    </>
  );

  return (
    <div className="row-flex top center">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message> {error} </Message>
      ) : (
        bodyContent
      )}
    </div>
  );
};

export default ProductDetailsPage;
