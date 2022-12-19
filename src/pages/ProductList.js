import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../component/Message.js";
import {
  getAllProducts,
  createProduct,
} from "../redux/actions/productActions.js";
import Loader from "../component/Loader/LoadingSpinner.js";

import { deleteProduct } from "../redux/actions/productActions.js";
import { useNavigate } from "react-router-dom";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../redux/constants/productContants.js";

import { frontEnd_API } from "../utils/utls.js";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fullPageRef = useRef(null);

  const { products, loading, error } = useSelector(
    (state) => state.productList
  );

  const {
    success: productDeleteSuccess,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.productDelete);

  const {
    loading: createLoading,
    success: createSuccess,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  const deleteProductHandler = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const editButtonHandler = (productId) => {
    navigate(`/product/${productId}/edit`);
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  // src={`http://localhost:5000${product.image}`}
  useEffect(() => {
    if (createSuccess) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct.product._id}/edit`);
      // console.log(createdProduct);
    }

    if (productDeleteSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    dispatch(getAllProducts({}));
  }, [productDeleteSuccess, createSuccess]);

  useEffect(() => {
    // console.log(fullPageRef);
    // console.log(fullPageRef.current?.offsetWidth);
  }, [fullPageRef.current?.offsetWidth]);

  return (
    <div ref={fullPageRef}>
      <div className="row-flex">
        <h2 className="page-header">Product List</h2>
        <button onClick={createProductHandler} className="primary">
          Create Product
        </button>
      </div>

      {productError && <Message>{productError}</Message>}
      {productLoading && <Loader />}

      <table className="productTable">
        <thead>
          <tr>
            <th>Image</th>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            products?.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    className="vsmall"
                    src={`${product.imageURL}`}
                    alt={product.name}
                  />
                </td>
                <td>{product._id}</td>

                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>

                <td>
                  <button onClick={() => editButtonHandler(product._id)}>
                    Edit
                  </button>{" "}
                  <button onClick={() => deleteProductHandler(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
