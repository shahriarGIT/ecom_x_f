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
        products: action.payload.products,
        page: action.payload.pageNumber,
        totalPages: action.payload.totalPages,
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

export const getCategoriesReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case actionType.CATEGORY_LIST_REQUEST:
      return {
        loading: true,
      };
    case actionType.CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case actionType.CATEGORY_LIST_FAIL:
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

export const createProductReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case actionType.PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case actionType.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case actionType.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actionType.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case actionType.PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case actionType.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionType.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionType.PRODUCT_DELETE_FAIL:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionType.PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case actionType.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionType.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionType.PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
