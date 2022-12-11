import * as actionType from "../constants/orderConstants.js";
import { CART_EMPTY } from "../constants/cartConstants.js";

import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

const instance = axios.create({
  baseURL: "https://ecom-x-b.vercel.app/api",
});

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: actionType.ORDER_CREATE_REQUEST });

  const { userInfo } = getState().signIn;

  try {
    const { data } = await instance.post("/orders/", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionType.ORDER_CREATE_SUCCESS, payload: data.order });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: actionType.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  const { userInfo } = getState().signIn;
  dispatch({ type: actionType.ORDER_DETAILS_REQUEST });
  try {
    const { data } = await instance.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionType.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionType.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
