import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  getAllProductReducer,
  detailProductReducer,
  productDeleteReducer,
  productUpdateReducer,
  createProductReducer,
} from "./reducer/productReducer.js";

import { cartReducer } from "./reducer/cartReducer.js";

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
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
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
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
