const { Double } = require('mongodb');
const { ObjectId } = require('mongodb');
const connectDB = require('./connect');

async function createProduct(productData) {
  const { products } = await connectDB();
  productData.category = productData.category.toLowerCase();
  if (typeof productData.price === 'string' || typeof productData.price === 'number') {
    productData.price = Double.fromString(productData.price.tostring());
  }
  const result = products.insertOne(productData);
  return result;
}

async function getProductById({ productId }) {
  const { products } = await connectDB();
  return products.findOne({ _id: new ObjectId(productId) });
}

async function updateProduct(productId, updateData) {
  const { products } = await connectDB();
  return products.updateOne({ _id: productId }, { $set: updateData });
}

async function deleteProduct(productId) {
  const { products } = await connectDB();
  return products.deleteOne({ _id: productId });
}

async function getAllProducts() {
  const { products } = await connectDB();
  return products.find({}).toArray();
}

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts
}
