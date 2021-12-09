import axios from "axios";
import { CART_ADD_ITEMS, CART_REMOVE_ITEMS } from "../constants/constants";

export const getCartItems = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEMS,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image,
      InStock: data.product.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeCartItems = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEMS, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
