import express from 'express';


import {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  addReviewProduct,
  getTopProducts,
} from "../controllers/productController.js";
import protect, { adminMiddleware } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.route("/topProducts").get(getTopProducts);
routes
  .route("/")
  .get(getAllProducts)
  .post(protect, adminMiddleware, createProduct);
routes
  .route("/:id")
  .get(getProductById)
  .delete(protect, adminMiddleware, deleteProduct)
  .put(protect, adminMiddleware, updateProduct);

routes.route("/:id/review").post(protect, addReviewProduct);


 export default routes;