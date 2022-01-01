import express from "express";

import { createOrder, getOrderByID } from "../controllers/orderController.js";
import protect from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").post(protect, createOrder);
routes.route("/:id").get(protect, getOrderByID);

export default routes;
