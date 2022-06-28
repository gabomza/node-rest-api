const { Database } = require("../database");
const { ObjectId } = require("mongodb");
const { Variables } = require("../common/variables");
const { USERS_COLLECTION } = Variables;

const getAll = async () => {
  const collection = await Database(USERS_COLLECTION);
  return collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(USERS_COLLECTION);
  return collection.findOne({ _id: ObjectId(id) });
};

const create = async (user) => {
  const collection = await Database(USERS_COLLECTION);
  const result = await collection.insertOne(user);
  return result.insertedId;
};

const update = async (id, user) => {
  const collection = await Database(USERS_COLLECTION);
  const filter = { _id: ObjectId(id) };

  const updateDoc = {
    $set: user,
  };

  const result = await collection.updateOne(filter, updateDoc);
  const { matchedCount, modifiedCount } = result;
  return {
    matchedCount,
    modifiedCount,
  };
};

const remove = async (id) => {
  const collection = await Database(USERS_COLLECTION);
  const filter = { _id: ObjectId(id) };
  const result = await collection.deleteOne(filter);
  return result.deletedCount;
};

module.exports.UsersService = {
  getAll,
  getById,
  create,
  update,
  remove,
  USERS_COLLECTION,
};
