import axios from "axios";
import * as actionType from "../constants/cartConstants.js";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

const instance = axios.create({
  baseURL: "https://ecom-x-b.vercel.app/api",
});

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await instance.get(`/products/${productId}`);

    const {
      cart: { cartItems },
    } = getState();

    // if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    //   dispatch({
    //     type: actionType.CART_ADD_ITEM_FAIL,
    //     payload: `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`,
    //   });
    // } else {
    dispatch({
      type: actionType.CART_ADD_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        productId: data._id,
        seller: data.seller,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
    // }
  };

export const removeItemFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: actionType.CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

  if (JSON.parse(localStorage.getItem("cartItems")).length === 0) {
    localStorage.removeItem("cartItems");
  }
};

export const saveShippingAddress = (details) => (dispatch) => {
  dispatch({ type: actionType.CART_SAVE_SHIPPING_ADDRESS, payload: details });
  localStorage.setItem("shippingInfo", JSON.stringify(details));
};

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch({ type: actionType.CART_SAVE_PAYMENT_METHOD, payload: method });
  localStorage.setItem("paymentMethod", method);
};
