export const menuReducer = (state = { menuActive: false }, action) => {
  switch (action.type) {
    case "TOGGLE_MOBILE_MENU_ON":
      return {
        ...state,
        menuActive: true,
      };
    case "TOGGLE_MOBILE_MENU_OFF":
      return {
        ...state,
        menuActive: false,
      };
    case "TOGGLE_MOBILE_MENU":
      return {
        ...state,
        menuActive: !state.menuActive,
      };
    default:
      return state;
  }
};
