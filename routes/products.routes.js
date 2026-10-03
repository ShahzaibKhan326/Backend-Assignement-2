const express = require("express")

const productRoutes = express.Router()

const {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} = require("../controllers/product.controller")

const verifyToken = require("../middlewares/auth.middleware")

const upload = require("../middlewares/upload.middleware")


productRoutes.get(
  "/",
  getProductsController
)


productRoutes.get(
  "/:id",
  getProductByIdController
)


productRoutes.post(
  "/",
  verifyToken,
  upload.single("image"),
  createProductController
)


productRoutes.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  updateProductController
)


productRoutes.delete(
  "/:id",
  verifyToken,
  deleteProductController
)


module.exports = productRoutes