
import { applyMiddleware, combineReducers, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {
  productReducer,
  productDetailsReducer,
} from "../reducers/productReducer";

import thunk from "redux-thunk";
import { cartReducer } from "../reducers/cartReducer";

const reducer = combineReducers({
  productList: productReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
});
const currentCartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  cart: { cartItems: currentCartItems },
};
const middleware=[thunk]
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store;