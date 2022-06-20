import * as actionEvent from "../constants/userConstants.js";

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case actionEvent.USER_SIGN_UP_REQUEST:
      return {
        loading: true,
      };
    case actionEvent.USER_SIGN_UP_SUCCESS:
      return {
        loading: false,
      };
    case actionEvent.USER_SIGN_UP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case actionEvent.USER_SIGN_IN_REQUEST:
      return {
        loading: true,
      };
    case actionEvent.USER_SIGN_IN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case actionEvent.USER_SIGN_IN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case actionEvent.USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

export const userListReducer = (
  state = { users: [], loading: true },
  action
) => {
  switch (action.type) {
    case actionEvent.USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case actionEvent.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case actionEvent.USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case actionEvent.USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case actionEvent.USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionEvent.USER_DELETE_FAIL:
      return {
        loading: false,
        payload: action.payload,
      };
    case actionEvent.USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionEvent.USER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case actionEvent.USER_DETAIL_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case actionEvent.USER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case actionEvent.USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case actionEvent.USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionEvent.USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionEvent.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userProfileUpdateReducer = (
  state = { loading: false },
  action
) => {
  switch (action.type) {
    case actionEvent.USER_UPDATE_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case actionEvent.USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actionEvent.USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionEvent.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
