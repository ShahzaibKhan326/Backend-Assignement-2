const express = require("express")
require("dotenv").config()

const connectDB = require("./config/db")

const productRoutes = require("./routes/products.routes")
const authRoutes = require("./routes/auth.routes")

const app = express()

connectDB()

app.use(express.json())

app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})