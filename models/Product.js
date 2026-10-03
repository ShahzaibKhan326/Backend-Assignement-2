const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  title: String,

  description: String,

  price: Number,

  category: String,

  stock: Number,

  image: String
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product