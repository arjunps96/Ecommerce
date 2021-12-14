import express from "express";

import {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/").post(registerUser);
routes.post("/login", userAuth);
routes
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default routes;
