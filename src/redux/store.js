import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  getAllProductReducer,
  detailProductReducer,
} from "./reducer/productReducer.js";

const initialState = {};

const reducer = combineReducers({
  productList: getAllProductReducer,
  productDetails: detailProductReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
