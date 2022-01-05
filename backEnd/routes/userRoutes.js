import express from "express";

import {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from "../controllers/userController.js";

import protect, { adminMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").get(protect, adminMiddleware, getUsers).post(registerUser);

routes.route("/login").post(userAuth);
routes
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default routes;
