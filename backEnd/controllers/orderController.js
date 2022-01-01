import asyncHandler from "express-async-handler";

import Order from "../Models/OrderModel.js";

export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (!orderItems) {
    res.status(404);
    throw new Error("Some error occured");
  }
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  });
  const orderItem = await order.save();
  res.status(201).json(orderItem);
});

export const getOrderByID = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate("user", "name email");
  if (!order) {
    res.status(404).json({ message: "No orders found for this ID" });
  }
  res.status(200).json(order);
});
