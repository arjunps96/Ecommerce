import asyncHandler from "express-async-handler";

import Product from "../Models/ProductModel.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  const count = await Product.countDocuments({ ...keyword });
  res.status(200).json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json({
      product,
    });
  } else {
    res.status(404).json({
      message: "No product found",
    });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.status(200).json({ message: "Product removed successfully" });
  } else {
    res.status(404).json({
      message: "No product found",
    });
  }
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user.id,
    name: "Sample Product",
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    description: "Sample Description",
    rating: 5,
    numReviews: 0,
    price: 0,
    countInStock: 0,
  });

  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.user = req.user._id;
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.description = req.body.description;
    product.rating = req.body.rating;
    product.numReviews = req.body.numReviews;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("No product found for this ID");
  }
});
export const addReviewProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;
  if (product) {
    const existingUser = product.Reviews.find(
      (r) => r.User.toString() === req.user._id.toString()
    );
    if (existingUser) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      User: req.user._id,
    };
    product.Reviews.push(review);
    product.numReviews = product.Reviews.length;
    product.rating =
      product.Reviews.reduce((acc, item) => acc + Number(item.rating), 0) /
      product.Reviews.length;
    await product.save();

    res.status(200).json({ message: "Review added successfully" });
  } else {
    res.status(404);
    throw new Error("No product found for this ID");
  }
});

export const getTopProducts = asyncHandler(async (req, res) => {
  const product = await Product.find({}).sort({ rating: -1 }).limit(3);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({
      message: "No products found",
    });
  }
});