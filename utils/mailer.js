const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
})


const sendWelcomeEmail = async (email, username) => {

  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Welcome to our E-Commerce App",

    text: `Hello ${username}, welcome to our E-Commerce App!`
  })

}


module.exports = {
  sendWelcomeEmail
}