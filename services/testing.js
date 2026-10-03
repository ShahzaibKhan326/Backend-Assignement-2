const Product = require("../models/Product")

const getProducts = async () => {
  const products =  await Product.find()
  return products 
}

module.exports = { getProducts}