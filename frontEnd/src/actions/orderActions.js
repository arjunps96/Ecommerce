import {
  ORDER_ALL_FAIL,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/constants";
import axios from "axios";

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { token } = getState().user.userInfo;

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post("/api/orders", order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getOrderAction = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { token } = getState().user.userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const updateOrderPayAction =
  (orderId, paymentRequest) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const { token } = getState().user.userInfo;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/api/orders/${orderId}/pay`, paymentRequest, config);

      dispatch({ type: ORDER_PAY_SUCCESS });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
export const updateOrderDeliverAction =
  (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVER_REQUEST });
      const { token } = getState().user.userInfo;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/api/orders/${order._id}/deliver`, order, config);

      dispatch({ type: ORDER_DELIVER_SUCCESS });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_MY_LIST_REQUEST });
    const { token } = getState().user.userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `/api/orders/myorders`,

      config
    );

    dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ALL_REQUEST });
    const { token } = getState().user.userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      "/api/orders",

      config
    );

    dispatch({ type: ORDER_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_ALL_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
