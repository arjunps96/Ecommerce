
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {
  productReducer,
  productDetailsReducer,
} from "../reducers/productReducer";
import {
  userReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "../reducers/userReducer";
import thunk from "redux-thunk";
import { cartReducer } from "../reducers/cartReducer";
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  ordermyListReducer,
} from "../reducers/orderReducers";

const reducer = combineReducers({
  productList: productReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderItems: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: ordermyListReducer,
});
const currentCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoDetails = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const userShippingDetails = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initialState = {
  cart: { cartItems: currentCartItems, shippingAddress: userShippingDetails },
  user: { userInfo: userInfoDetails },
};
const middleware=[thunk]
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store;