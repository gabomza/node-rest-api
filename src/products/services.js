const { Database } = require("../database");
const { ObjectId } = require("mongodb");
const { ProductsUtil } = require("./utils");
const { Variables } = require("../common/variables");
const { PRODUCTS_COLLECTION } = Variables;

const getAll = async () => {
  const collection = await Database(PRODUCTS_COLLECTION);
  return collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(PRODUCTS_COLLECTION);
  return collection.findOne({ _id: ObjectId(id) });
};

const create = async (product) => {
  const collection = await Database(PRODUCTS_COLLECTION);
  const result = await collection.insertOne(product);
  return result.insertedId;
};

const update = async (id, product) => {
  const collection = await Database(PRODUCTS_COLLECTION);
  const filter = { _id: ObjectId(id) };

  const updateDoc = {
    $set: product,
  };

  const result = await collection.updateOne(filter, updateDoc);
  const { matchedCount, modifiedCount } = result;
  return {
    matchedCount,
    modifiedCount,
  };
};

const remove = async (id) => {
  const collection = await Database(PRODUCTS_COLLECTION);
  const filter = { _id: ObjectId(id) };
  const result = await collection.deleteOne(filter);
  return result.deletedCount;
};

const generateReport = async (name, res) => {
  const products = await getAll();
  ProductsUtil.spreadsheetGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll,
  getById,
  create,
  update,
  remove,
  generateReport,
};
