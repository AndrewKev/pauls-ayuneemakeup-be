const { findProducts } = require('./product.repository');

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
};

module.exports = {
  getAllProducts
};