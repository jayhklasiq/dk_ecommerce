const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;
const dbName = 'dk_store';

async function connectDB() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  // Define the schema for the products collection
  const productSchema = {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["productName", "price", "category", "imageURL", "description"],
        properties: {
          productName: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          price: {
            bsonType: "double",
            description: "must be a double and is required"
          },
          category: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          imageURL: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          description: {
            bsonType: "string",
            description: "must be a string and is required"
          }
        }
      }
    }
  };

  // Define the schema for the users collection
  const userSchema = {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email"],
        properties: {
          username: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          email: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          password: {
            bsonType: ["string", "null"],
            description: "can be a string or null"
          },
          googleId: {
            bsonType: ["string", "null"],
            description: "can be a string or null"
          }
        }
      }
    }
  };

  const cartItemSchema = {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["userId", "productId", "productName", "price", "imageURL"],
        properties: {
          userId: {
            bsonType: "objectId",
            description: "must be an objectId and is required"
          },
          productId: {
            bsonType: "objectId",
            description: "must be an objectId and is required"
          },
          productName: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          price: {
            bsonType: "double",  // Using "double" for decimal values
            description: "must be a decimal and is required"
          },
          imageURL: {
            bsonType: "string",
            description: "must be a string and is required"
          }
        }
      }
    }
  };



  // Apply the schema to the products collection
  await db.command({
    collMod: "products",
    validator: productSchema.validator
  });

  // Apply the schema to the users collection
  await db.command({
    collMod: "users",
    validator: userSchema.validator
  });

  await db.command({
    collMod: "carts",
    validator: cartItemSchema.validator
  });

  return {
    db,
    products: db.collection('products'),
    users: db.collection('users'),
    orders: db.collection('orders'),
    carts: db.collection('carts')
  };
}

module.exports = connectDB;
