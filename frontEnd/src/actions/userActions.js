import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  USER_UPDATE_PROFILE_RESETS,
  ORDER_MY_LIST_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
} from "../constants/constants";

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      "Content-type": "application/json",
    };
    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_UPDATE_PROFILE_RESETS });
  dispatch({ type: ORDER_MY_LIST_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: USER_LOGOUT });
};

export const userRegister = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const config = {
      "Content-type": "application/json",
    };
    const { data } = await axios.post(
      "/api/user",
      { email, password, name },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const userDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { token } = getState().user.userInfo;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`api/user/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const userUpdateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { token } = getState().user.userInfo;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put("/api/user/profile", user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const userShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: USER_SAVE_SHIPPING_ADDRESS, payload: data });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const cartSavePayment = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });

  localStorage.setItem("PaymentMethod", JSON.stringify(data));
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { token } = getState().user.userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/user", config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
