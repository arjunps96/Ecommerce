import asyncHandler from "express-async-handler";

import User from "../Models/UserModel.js";

import { generateToken } from "../utils/GenerateToken.js";

export const userAuth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});
