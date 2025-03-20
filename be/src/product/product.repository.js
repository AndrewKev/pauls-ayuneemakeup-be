const prisma = require('../db');

const findProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

module.exports = {
  findProducts
};