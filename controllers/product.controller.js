const fs = require("fs")

const productValidationSchema = require("../middlewares/product.validation")

const cloudinary = require("../config/cloudinary")

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../services/product.service")


const getProductsController = async (req, res) => {
  try {
    const products = await getProducts()

    res.status(200).json({
      status: true,
      data: products
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}


const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params

    const product = await getProductById(id)

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      status: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}


const createProductController = async (req, res) => {
  try {

    console.log("FILE:",req.file)
    const { error } = productValidationSchema.validate(req.body)

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message
      })
    }

    let imageUrl = ""

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "ecommerce-products"
        }
      )

      imageUrl = result.secure_url

      fs.unlinkSync(req.file.path)
    }

    const product = await createProduct({
      ...req.body,
      image: imageUrl
    })

    res.status(201).json({
      status: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}


const updateProductController = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = productValidationSchema.validate(req.body)

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message
      })
    }

    const existingProduct = await getProductById(id)

    if (!existingProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      })
    }

    let productData = {
      ...req.body
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "ecommerce-products"
        }
      )

      productData.image = result.secure_url

      fs.unlinkSync(req.file.path)
    }

    const product = await updateProduct(id, productData)

    res.status(200).json({
      status: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}


const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params

    const product = await deleteProduct(id)

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      status: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}


module.exports = {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
}