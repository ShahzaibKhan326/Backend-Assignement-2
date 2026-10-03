const express = require("express")

const {
  registerController,
  loginController,
  profileController
} = require("../controllers/auth/auth.controllers")

const verifyToken = require("../middlewares/auth.middleware")


const authRoutes = express.Router()


authRoutes.post(
  "/register",
  registerController
)


authRoutes.post(
  "/login",
  loginController
)


authRoutes.get(
  "/profile",
  verifyToken,
  profileController
)


module.exports = authRoutes