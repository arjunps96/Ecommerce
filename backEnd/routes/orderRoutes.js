import express from "express";

import {
  createOrder,
  getOrderByID,
  updateOrderPay,
  getMyOrders,
  getAllOrders,
  updateOrderDeliver,
} from "../controllers/orderController.js";
import protect, { adminMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes
  .route("/")
  .post(protect, createOrder)
  .get(protect, adminMiddleware, getAllOrders);
routes.route("/myorders").get(protect, getMyOrders);
routes.route("/:id").get(protect, getOrderByID);
routes.route("/:id/pay").put(protect, updateOrderPay);
routes.route("/:id/deliver").put(protect, adminMiddleware, updateOrderDeliver);


export default routes;
