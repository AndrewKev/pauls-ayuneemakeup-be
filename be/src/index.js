const express = require('express')
const cookieParser = require("cookie-parser");

const { auth } = require('./middleware/auth');

const app = express()
const port = 8080

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const authController = require("./auth/auth.controller");
app.use("/auth", authController);

const productController = require("./product/product.controller");
app.use("/products", auth, productController);

const newsController = require("./news/news.controller");
app.use("/news", newsController);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})