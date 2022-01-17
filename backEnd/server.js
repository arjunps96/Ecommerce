

import express from 'express'
import dotenv from 'dotenv'


import path from "path";

import connectDB from "./config/db.js";

import ProductRoutes from "./routes/productsRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import OrderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import { notFound, genralError } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`App listening to port ${PORT} in ${process.env.ENV}`)
);

connectDB();
app.use(express.json());
app.use("/api/products", ProductRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/uploads", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/paypal/clientId", async (req, res) => {
  const clientID = process.env.PAYPAL_CLIENT_ID;
  res.send(clientID);
});

app.use(notFound)
app.use(genralError)






