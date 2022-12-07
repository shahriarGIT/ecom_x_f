import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  getAllProductReducer,
  detailProductReducer,
  productDeleteReducer,
  productUpdateReducer,
  createProductReducer,
  getCategoriesReducer,
} from "./reducer/productReducer.js";

import { cartReducer } from "./reducer/cartReducer.js";

import {
  orderCreateReducer,
  orderDetailsReducer,
} from "./reducer/orderReducer.js";

import {
  userUpdateReducer,
  userProfileUpdateReducer,
  userDetailReducer,
} from "./reducer/userReducer.js";

import {
  userSignUpReducer,
  userSignInReducer,
  userListReducer,
  userDeleteReducer,
} from "./reducer/userReducer.js";

const initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    shipping: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    payment: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "PayPal",
  },
};

const reducer = combineReducers({
  productList: getAllProductReducer,
  productDetails: detailProductReducer,
  productCreate: createProductReducer,
  productDelete: productDeleteReducer,
  updatedProduct: productUpdateReducer,
  cart: cartReducer,
  signIn: userSignInReducer,
  signUp: userSignUpReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  updatedUserProfile: userProfileUpdateReducer,
  userDetail: userDetailReducer,
  createdOrder: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  categories: getCategoriesReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
