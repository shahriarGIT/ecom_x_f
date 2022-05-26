import * as actionType from "../constants/productContants.js";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAllProducts = () => async (dispatch, getState) => {
  dispatch({ type: actionType.PRODUCT_LIST_REQUEST });

  try {
    const { data } = await instance.get("/products/");

    console.log(data, "from action product");
    dispatch({ type: actionType.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionType.PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  dispatch({ type: actionType.PRODUCT_DETAIL_REQUEST });

  try {
    const { data } = await instance.get(`/products/${productId}`);
    console.log(data, "from action");

    if (data) {
      dispatch({
        type: actionType.PRODUCT_DETAIL_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
