import * as actionType from "../constants/productContants.js";

export const getAllProductReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case actionType.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      };
    case actionType.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case actionType.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const detailProductReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionType.PRODUCT_DETAIL_REQUEST:
      return { loading: true };
    case actionType.PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionType.PRODUCT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
