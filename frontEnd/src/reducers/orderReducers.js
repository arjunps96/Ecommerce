import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
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
