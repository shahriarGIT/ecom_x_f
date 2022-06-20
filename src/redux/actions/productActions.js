import * as actionType from "../constants/productContants.js";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getAllProducts = () => async (dispatch, getState) => {
  dispatch({ type: actionType.PRODUCT_LIST_REQUEST });

  try {
    const { data } = await instance.get("/products/");

    // console.log(data, "from action product");
    dispatch({ type: actionType.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: actionType.PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  dispatch({ type: actionType.PRODUCT_DETAIL_REQUEST });

  try {
    const { data } = await instance.get(`/products/${productId}`);
    // console.log(data, "from action");

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

export const deleteProduct = (productId) => async (dispatch, getState) => {
  const { userInfo } = getState().signIn;

  dispatch({ type: actionType.PRODUCT_DELETE_REQUEST });

  try {
    const { data } = await instance.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (data) {
      dispatch({ type: actionType.PRODUCT_DELETE_SUCCESS, payload: data });
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

export const productUpdate = (product) => async (dispatch, getState) => {
  dispatch({ type: actionType.PRODUCT_UPDATE_REQUEST, payload: product });

  const { userInfo } = getState().signIn;
  try {
    const { data } = await instance.put(`/products/${product._id}`, product, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionType.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: actionType.PRODUCT_CREATE_REQUEST });
  const { userInfo } = getState().signIn;
  try {
    const { data } = await instance.post(
      "/products/",
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: actionType.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
