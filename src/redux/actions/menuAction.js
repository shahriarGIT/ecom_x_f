export const toggleMobileMenuStatusOn = () => (dispatch) => {
  dispatch({ type: "TOGGLE_MOBILE_MENU_ON" });
};

export const toggleMobileMenuStatusOff = () => (dispatch) => {
  dispatch({ type: "TOGGLE_MOBILE_MENU_OFF" });
};

export const toggleMobileMenuStatus = () => (dispatch) => {
  dispatch({ type: "TOGGLE_MOBILE_MENU" });
};
