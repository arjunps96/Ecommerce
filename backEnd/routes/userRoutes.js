import express from "express";

import { userAuth } from "../controllers/userController.js";

const routes = express.Router();

routes.post("/login", userAuth);

export default routes;
