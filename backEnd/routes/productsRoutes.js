import express from 'express';


import {
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const routes = express.Router();

routes.route("/").get(getAllProducts);
routes.route("/:id").get(getProductById);

 export default routes;