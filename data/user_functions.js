const connectDB = require('./connect');


async function createUser({ username, email, password }) {
  const { users } = await connectDB();
  const result = await users.insertOne({ username, email, password });
  return result.insertedId;
}

async function createUserGoogle({ username, email, googleId }) {
  const { users } = await connectDB();
  const result = await users.insertOne({ username, email, googleId });
  return result.insertedId;
}

async function getUserByEmail({ email }) {
  const { users } = await connectDB();
  return users.findOne({ email });
}

async function getUserWithPassword({ email, password }) {
  const { users } = await connectDB();
  return users.findOne({ email, password });
}

async function updateUserInfo(userId, updateData) {
  const { users } = await connectDB();
  return users.updateOne({ _id: userId }, { $set: updateData });
}

module.exports = {
  createUser,
  createUserGoogle,
  getUserByEmail,
  getUserWithPassword,
  updateUserInfo
};