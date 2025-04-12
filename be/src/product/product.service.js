const { z } = require('zod');

const {
  findProducts,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct
} = require('./product.repository');

const getAllProducts = async () => {
  const products = await findProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    const err = new Error("Product not found");
    err.code = 404;
    throw err;
  }

  return product;
}

const addNewProduct = async (data) => {
  const schema = z.object({
    name: z.string().min(1, "Name cannot be empty"),
    price: z.number(),
    description: z.string(),
    image: z.string()
  });

  const result = schema.safeParse(data);

  if (!result.success) {
    throw result.error.flatten();
  }

  const product = await insertProduct(data);

  return product;
}

const editProductById = async (id, data) => {
  return await updateProduct(id, data);
}

const deleteProductById = async (id) => {
  const product = getProductById(id);

  await deleteProduct(id);

  return product;
}

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProductById,
  deleteProductById
};