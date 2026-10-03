const Product = require("../models/Product")

const getProducts = async () => {
  const products = await Product.find()

  return products
}

const getProductById = async (id) => {
  const product = await Product.findById(id)

  return product
}

const createProduct = async (productData) => {
  const product = await Product.create(productData)

  return product
}

const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(
    id,
    productData,
    { new: true }
  )

  return product
}

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id)

  return product
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}