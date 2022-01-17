import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_REQUEST,
  ORDER_MY_LIST_RESET,
  ORDER_MY_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/constants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        isloading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        isloading: false,
        order: action.payload,
        success: true,
      };
    case ORDER_CREATE_FAIL:
      return {
        isloading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { isloading: true, orderItems: [] },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isloading: false,
        orderItems: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        isloading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        isloading: false,
        success: true,
        error: null,
      };
    case ORDER_PAY_FAIL:
      return {
        isloading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        isloading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        isloading: false,
        success: true,
        error: null,
      };
    case ORDER_DELIVER_FAIL:
      return {
        isloading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const ordermyListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_MY_LIST_REQUEST:
      return {
        isloading: true,
      };
    case ORDER_MY_LIST_SUCCESS:
      return {
        isloading: false,
        orders: action.payload,
        error: null,
      };
    case ORDER_MY_LIST_FAIL:
      return {
        isloading: false,
        error: action.payload,
      };
    case ORDER_MY_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderAllReducer = (
  state = { orders: [], isloading: true },
  action
) => {
  switch (action.type) {
    case ORDER_ALL_REQUEST:
      return {
        isloading: true,
      };
    case ORDER_ALL_SUCCESS:
      return {
        isloading: false,
        orders: action.payload,
        error: null,
      };
    case ORDER_ALL_FAIL:
      return {
        isloading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};