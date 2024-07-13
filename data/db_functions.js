const { Double, ObjectId } = require('mongodb');
const connectDB = require('./connect');

async function createProduct(productData) {
  try {
    const { products } = await connectDB();
    productData.category = productData.category.toLowerCase();
    if (typeof productData.price === 'string' || typeof productData.price === 'number') {
      productData.price = Double.fromString(productData.price.toString());
    }
    const result = await products.insertOne(productData);
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

async function getProductById({ productId }) {
  try {
    const { products } = await connectDB();
    return await products.findOne({ _id: new ObjectId(productId) });
  } catch (error) {
    console.error('Error getting product by ID:', error);
    throw error;
  }
}

async function updateProduct(productId, updateData) {
  try {
    const { products } = await connectDB();
    return await products.updateOne({ _id: new ObjectId(productId) }, { $set: updateData });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const { products } = await connectDB();
    return await products.deleteOne({ _id: new ObjectId(productId) });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { products } = await connectDB();
    return await products.find({}).toArray();
  } catch (error) {
    console.error('Error getting all products:', error);
    throw error;
  }
}

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts
};
