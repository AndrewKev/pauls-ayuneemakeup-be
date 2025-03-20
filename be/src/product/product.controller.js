const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  // const products = await getAllProducts();

  res.send("hello from products");
});

module.exports = router;