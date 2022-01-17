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

export const updateOrderPay = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404).json({ message: "No orders found for this ID" });
  }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    updated_time: req.body.updated_time,
    email_address: req.body.payer.email_address,
  };
  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});
export const updateOrderDeliver = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404).json({ message: "No orders found for this ID" });
  }
  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});