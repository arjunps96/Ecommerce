
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {
  productReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productEditReducer,
  productCreateReviewReducer,
  productTopReducer,
} from "../reducers/productReducer";
import {
  userReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "../reducers/userReducer";
import thunk from "redux-thunk";
import { cartReducer } from "../reducers/cartReducer";
import {
  orderReducer,
  orderDetailsReducer,
  orderPayReducer,
  ordermyListReducer,
  orderAllReducer,
  orderDeliverReducer,
} from "../reducers/orderReducers";

const reducer = combineReducers({
  productList: productReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productcreateReview: productCreateReviewReducer,
  productTop: productTopReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderItems: orderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: ordermyListReducer,
  orderAll: orderAllReducer,
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