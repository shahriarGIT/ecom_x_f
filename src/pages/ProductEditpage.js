import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductDetails,
  productUpdate,
} from "../redux/actions/productActions.js";

import { deleteProduct } from "../redux/actions/productActions.js";

import { PRODUCT_UPDATE_RESET } from "../redux/constants/productContants.js";

const ProductEditpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  const { product } = useSelector((state) => state.productDetails);
  const { loading, error, success } = useSelector(
    (state) => state.updatedProduct
  );
  const [isChanged, setIsChanged] = useState(false);

  const { userInfo } = useSelector((state) => state.signIn);

  //   const isProductAvailableInStore = (productId) => {
  //     return products.findIndex((p) => p._id === productId);
  //   };

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [imageLoading, setImageLoading] = useState("false");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      console.log("from reset useEffect", success);

      navigate("/productlist");
    }
    if (!product || product._id !== productId || success) {
      console.log("from success useEffect", success);
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setBrand(product.brand);
      setPrice(product.price);
      setCategory(product.category);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setImage(product.image);
    }
  }, [productId, product, success]);

  const submithandler = (e) => {
    e.preventDefault();

    dispatch(
      productUpdate({
        _id: productId,
        name,
        price,
        category,
        brand,
        countInStock,
        description,
        image,
      })
    );

    // console.log({
    //   _id: productId,
    //   name,
    //   price,
    //   category,
    //   brand,
    //   countInStock,
    //   description,
    // });
  };

  const instance = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  const imageHandler = async (e) => {
    setImageLoading(true);
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const { data } = await instance.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImageLoading(false);
      setImage(data);
    } catch (error) {
      setImageLoading(false);
      setImageError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={submithandler}>
        <div>
          <h2>Edit Product - {product?._id}</h2>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            id="stock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            rows="3"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            value={image}
            placeholder="Choose Image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageFile">Image</label>
          <input
            type="file"
            id="imageFile"
            placeholder="Choose Image"
            onChange={imageHandler}
          />
        </div>
        <div>
          <button className="primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditpage;
