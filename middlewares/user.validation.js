const Joi = require("joi")

const userValidationSchema = Joi.object({
  username: Joi.string().required(),

  email: Joi.string().email().required(),

  password: Joi.string().required(),

  phone: Joi.string().required()
})

module.exports = userValidationSchema