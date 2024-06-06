const { MongoClient } = require('mongodb');

async function connectDB() {
  const url = process.env.MONGODB_URI;

  // Create a new MongoClient
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected successfully to database");

    const db = client.db('dk_store');

    // Define collections
    const products = db.collection('products');
    // const categories = db.collection('categories');
    const users = db.collection('users');
    const orders = db.collection('orders');
    const carts = db.collection('carts');

    return {db, products, users, orders, carts};
  } catch (err) {
    console.error('Error connecting to Database',err);
    throw err;
  }
}

module.exports = connectDB;
