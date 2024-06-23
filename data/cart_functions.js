const connectDB = require('./connect');

async function addToCart({ userId, productId, productName, price, imageURL }) {
  const { carts } = await connectDB();
  const result = await carts.insertOne({ userId, productId, productName, price, imageURL });
  return result;
}

module.exports = {
  addToCart,
};