import * as actionType from "../constants/productContants.js";
import axios from "axios";
import { frontEnd_API } from "../../utils/utls.js";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

const instance = axios.create({
  baseURL: `${frontEnd_API}/api`,
});

export const getAllProducts =
  ({ name = "", category = "", order = "newest", pageNumber = "" }) =>
  async (dispatch, getState) => {
    dispatch({ type: actionType.PRODUCT_LIST_REQUEST });

    try {
      const { data } = await instance.get(
        `/products?name=${name}&category=${category}&order=${order}&pageNumber=${pageNumber}`
      );

      // console.log(data, "from action product");
      dispatch({ type: actionType.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: actionType.PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const getCategories = () => async (dispatch) => {
  dispatch({ type: actionType.CATEGORY_LIST_REQUEST });

  try {
    const { data } = await instance.get("/products/category");

    if (data) {
      dispatch({ type: actionType.CATEGORY_LIST_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: actionType.CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
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

export const productUpdate =
  (product, formData) => async (dispatch, getState) => {
    dispatch({ type: actionType.PRODUCT_UPDATE_REQUEST, payload: product });

    console.log(product);
    const { userInfo } = getState().signIn;
    try {
      const { data } = await instance.put(
        `/products/${product._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
