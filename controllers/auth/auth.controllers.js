const User = require("../../models/User")

const userValidationSchema = require("../../middlewares/user.validation")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const {
  sendWelcomeEmail
} = require("../../utils/mailer")


const registerController = async (req, res) => {
  try {

    const { error } = userValidationSchema.validate(req.body)

    if (error) {
      return res.status(400).json({
        status: false,
        message: error.details[0].message
      })
    }

    const {
      username,
      email,
      password,
      phone
    } = req.body


    const hashedPassword = await bcrypt.hash(
      password,
      10
    )


    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone
    })

    await sendWelcomeEmail(email, username)

    const userData = user.toObject()

    delete userData.password


    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: userData
    })

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Email already exists"
      })
    }

    res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}


const loginController = async (req, res) => {
  try {

    const { email, password } = req.body


    const user = await User.findOne({ email })


    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid email and password"
      })
    }


    const isMatch = await bcrypt.compare(
      password,
      user.password
    )


    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid email and password"
      })
    }


    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    )


    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token
      }
    })

  } catch (error) {

    res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}


const profileController = async (req, res) => {
  try {

    const user = await User.findById(req.userId)
      .select("-password")


    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found"
      })
    }


    res.status(200).json({
      status: true,
      data: user
    })

  } catch (error) {

    res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}


module.exports = {
  registerController,
  loginController,
  profileController
}