const prisma = require('../db');

const findProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique(
    {
      where: {
        id
      }
    }
  );

  return product;
}

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  return product;
};

const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
}

const deleteProduct = async (id) => {
  await prisma.product.delete({ where: { id } });
}

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct
};