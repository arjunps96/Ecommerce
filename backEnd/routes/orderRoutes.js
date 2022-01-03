import express from "express";

import {
  createOrder,
  getOrderByID,
  updateOrderPay,
  getMyOrders,
} from "../controllers/orderController.js";
import protect from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").post(protect, createOrder);
routes.route("/myorders").get(protect, getMyOrders);
routes.route("/:id").get(protect, getOrderByID);
routes.route("/:id/pay").put(protect, updateOrderPay);


export default routes;
