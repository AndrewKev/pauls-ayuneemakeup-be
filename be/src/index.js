const express = require('express')

const app = express()
const port = 8080

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const productController = require("./product/product.controller");
app.use("/products", productController);

const newController = require("./news/news.controller");
app.use("/news", newController);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})