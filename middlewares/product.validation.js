const Joi = require("joi")

const productValidationSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),

  price: Joi.number().positive().required(),

  category: Joi.string().required(),

  stock: Joi.number().integer().min(0).required(),

  image: Joi.string().optional()
})

module.exports = productValidationSchema