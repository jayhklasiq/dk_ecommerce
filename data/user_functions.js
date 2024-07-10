const connectDB = require('./connect');
const { ObjectId } = require('mongodb');


async function createUser({ username, email, password }) {
  const { users } = await connectDB();
  const result = await users.insertOne({ username, email, password });
  return result.insertedId;
}

async function getUserByEmail({ email }) {
  const { users } = await connectDB();
  return users.findOne({ email });
}

async function addToCart({ userId, items: [{
  productId,
  productName,
  price,
  imageURL,
  description
}] }) {
  const { carts } = await connectDB();
  const result = await carts.insertOne({
    userId, items: [{
      productId,
      productName,
      price,
      imageURL,
      description
    }]
  });
  return result;
}

module.exports = {
  createUser,
  getUserByEmail,
  addToCart
};
