const express = require("express");

const router = express.Router();

const { getAllProducts } = require('./product.service');

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

module.exports = router;