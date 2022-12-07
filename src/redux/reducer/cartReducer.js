import * as actionEvent from "../constants/cartConstants.js";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionEvent.CART_ADD_ITEM:
      const product = action.payload;
      const existItem = state.cartItems.find(
        (item) => item.productId === product.productId
      );
      if (existItem) {
        return {
          ...state,
          error: "",
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId ? product : x
          ),
        };
      } else {
        return {
          ...state,
          error: "",
          cartItems: [...state.cartItems, product],
        };
      }

    case actionEvent.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      };

    case actionEvent.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shipping: action.payload,
      };

    case actionEvent.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        payment: action.payload,
      };
    case actionEvent.CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
