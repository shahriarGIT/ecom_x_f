import * as actionEvent from "../constants/userConstants.js";
import axios from "axios";
import { frontEnd_API } from "../../utils/utls.js";

// const instance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

const instance = axios.create({
  baseURL: `${frontEnd_API}/api`,
});

export const userSignUp = (username, email, password) => async (dispatch) => {
  dispatch({ type: actionEvent.USER_SIGN_UP_REQUEST });
  try {
    const { data } = await instance.post("/user/register", {
      username,
      email,
      password,
    });

    dispatch({ type: actionEvent.USER_SIGN_UP_SUCCESS });
    dispatch({ type: actionEvent.USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionEvent.USER_SIGN_UP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userSignIn = (email, password) => async (dispatch) => {
  dispatch({ type: actionEvent.USER_SIGN_IN_REQUEST });
  try {
    const { data } = await instance.post("/user/signin", { email, password });
    dispatch({ type: actionEvent.USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data?.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: actionEvent.USER_SIGN_IN_FAIL,
      payload: message,
    });
  }
};

export const userSignout = () => (dispatch) => {
  dispatch({ type: actionEvent.USER_SIGNOUT });
  localStorage.removeItem("userInfo");
};

export const getUserList = () => async (dispatch, getState) => {
  dispatch({ type: actionEvent.USER_LIST_REQUEST });

  const {
    signIn: { userInfo },
  } = getState();

  try {
    const { data } = await instance.get("/user/", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (data) {
      dispatch({ type: actionEvent.USER_LIST_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: actionEvent.USER_LIST_FAIL,
      payload:
        error.respone && error.respone.data.message
          ? error.respone.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: actionEvent.USER_DELETE_REQUEST });

  const { userInfo } = getState().signIn;
  try {
    const { data } = await instance.delete(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionEvent.USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionEvent.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: actionEvent.USER_UPDATE_REQUEST });
  const { userInfo } = getState().signIn;
  try {
    const { data } = await instance.put(`/user/${user.userId}`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionEvent.USER_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: actionEvent.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  const { userInfo } = getState().signIn;
  dispatch({ type: actionEvent.USER_UPDATE_PROFILE_REQUEST });
  try {
    const { data } = await instance.put("/user/profile", user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(data, "from action");

    dispatch({ type: actionEvent.USER_UPDATE_PROFILE_SUCCESS });
    dispatch({ type: actionEvent.USER_SIGN_IN_SUCCESS, payload: data });
    // dispatch({ type: actionEvent.USER_UPDATE_PROFILE_RESET });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionEvent.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetail = (userId) => async (dispatch, getState) => {
  dispatch({ type: actionEvent.USER_DETAIL_REQUEST });
  const { userInfo } = getState().signIn;
  try {
    const { data } = await instance.get(`/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: actionEvent.USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionEvent.USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
