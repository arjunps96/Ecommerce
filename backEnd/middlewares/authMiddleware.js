import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../Models/UserModel.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    try {
      req.user = await User.findById(decoded.id);
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token");
    }
  } else {
    res.status(401);
    throw new Error("No token found");
  }
  next();
});

export default authMiddleware;
