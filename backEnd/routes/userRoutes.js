import express from "express";

import {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
} from "../controllers/userController.js";

import protect, { adminMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").get(protect, adminMiddleware, getUsers).post(registerUser);
routes
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
routes
  .route("/:id")
  .delete(protect, adminMiddleware, deleteUser)
  .put(protect, adminMiddleware, updateUser)
  .get(protect, adminMiddleware, getUserByID);
routes.route("/login").post(userAuth);



export default routes;
