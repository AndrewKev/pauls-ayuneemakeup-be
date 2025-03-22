const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProductById,
  deleteProductById } = require('./product.service');

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await getProductById(productId);

    res.send({
      data: product
    });
  } catch (error) {
    const statusCode = error.code || 400;
    res.status(statusCode).send({ error: error.message || "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await addNewProduct(newProductData);

    res.send({
      data: product,
      message: "Insert product success",
    });
  } catch (error) {
    res.status(400).send({ error: error.message || "Something went wrong" });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const product = await editProductById(parseInt(req.params.id), req.body);

    res.send({
      message: "Product updated",
      product
    });
  } catch (error) {
    const statusCode = error.code || 400;
    res.status(statusCode).send({ error: error.message || "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await deleteProductById(productId);

    res.send({
      message: "Product deleted",
      product
    });
  } catch (error) {
    res.status(400).send({ error: error.message || "Something went wrong" });
  }
});

module.exports = router;