import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProductDetails } from "../redux/actions/productActions.js";

import Loader from "../component/Loader/LoadingSpinner.js";

export const ProductDetailsPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { id: productId } = params;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  console.log(product, loading, error);
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  let bodyContent = (
    <>
      <div className="col-2">
        {!loading && (
          <img className="medium" src={product.image} alt={product.name} />
        )}
      </div>
      <div className="col-1">
        <div className="card">
          {!loading && (
            <>
              <p>
                <b>{product.name}</b>
              </p>
              <p> Description : {product.price}</p>
              <p> Description : {product.description}</p>
            </>
          )}
        </div>
      </div>
      <div className="col-1">
        {!loading && (
          <p className="card">Product id - {productDetails.product.name}</p>
        )}
      </div>
    </>
  );

  return (
    <div className="row-flex top center">
      {loading ? <Loader /> : bodyContent}
    </div>
  );
};

export default ProductDetailsPage;
