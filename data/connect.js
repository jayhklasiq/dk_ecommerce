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
        required: ["username", "email", "password"],
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
            bsonType: "string",
            description: "must be a string and is required"
          }
        }
      }
    }
  };

  // Define a schema for the carts collection
  const cartSchema = {
    bsonType: "object",
    required: ["userId", "items"],
    properties: {
      userId: {
        bsonType: "string",
        description: "must be a string and is required"
      },
      items: {
        bsonType: "array",
        description: "must be an array and is required",
        items: {
          bsonType: "object",
          required: ["productId", "productName", "price", "category", "imageURL", "description"],
          properties: {
            productId: {
              bsonType: "ObjectId", 
              description: "must be a string and is required"
            },
            productName: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            price: {
              bsonType: "double",
              description: "must be a double and is required"
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
    }
  };


  // Apply the schema to the products collection
  await db.command({
    collMod: "products",
    validator: productSchema.validator,
    validationLevel: "strict"
  });

  // Apply the schema to the users collection
  await db.command({
    collMod: "users",
    validator: userSchema.validator,
    validationLevel: "strict"
  });

  // Apply the schema to the carts collection
  await db.command({
    collMod: "carts",
    validator: cartSchema.validator,
    validationLevel: "strict"
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
