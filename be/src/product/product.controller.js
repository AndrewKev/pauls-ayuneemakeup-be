const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProductById,
  deleteProductById } = require('./product.service');

const { auth } = require('../middleware/auth');

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send({
    message: "Success get all products",
    data: products
  });
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await getProductById(productId);

    res.send({
      message: "Success get product by id",
      data: product
    });
  } catch (error) {
    const statusCode = error.code || 400;
    res.status(statusCode).send({ error: error.message || "Something went wrong" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await addNewProduct(newProductData);

    res.send({
      message: "Insert product success",
      data: product,
    });
  } catch (error) {
    res.status(400).send({ error: error.message || "Something went wrong" });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    await getProductById(parseInt(req.params.id));

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

router.delete("/:id", auth, async (req, res) => {
  try {
    await getProductById(parseInt(req.params.id));

    const productId = parseInt(req.params.id);

    const product = await deleteProductById(productId);

    res.send({
      message: "Product deleted",
      deleted: product
    });
  } catch (error) {
    res.status(400).send({ error: error.message || "Something went wrong" });
  }
});

module.exports = router;