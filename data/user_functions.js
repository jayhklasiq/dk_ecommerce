const connectDB = require('./connect');
const { ObjectId, Double } = require('mongodb');

async function createUser({ username, email, password }) {
  try {
    const { users } = await connectDB();
    const result = await users.insertOne({ username, email, password });
    return result.insertedId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getUserByEmail({ email }) {
  try {
    const { users } = await connectDB();
    return await users.findOne({ email });
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

async function addToCart({ userId, items = [] }) {
  try {
    const { carts } = await connectDB();
    const existingCart = await carts.findOne({ userId: new ObjectId(userId) });

    if (existingCart) {
      await carts.updateOne(
        { userId: new ObjectId(userId) },
        { $push: { items: { $each: items } } }
      );
    } else {
      const result = await carts.insertOne({
        userId: new ObjectId(userId),
        items
      });
      return result;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

async function saveMessage({ username, email, message }) {
  try {
    const { user_complaints } = await connectDB();
    const result = await user_complaints.insertOne({ username, email, message });
    return result.insertedId;
  } catch (error) {
    console.error('Error saving message:', error);
    throw error;
  }
}

async function loadCartItems(userId) {
  try {
    const { carts } = await connectDB();
    return await carts.find({ userId: new ObjectId(userId) }).toArray();
  } catch (error) {
    console.error('Error loading cart items:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  addToCart,
  saveMessage,
  loadCartItems
};