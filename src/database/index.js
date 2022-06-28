const { MongoClient } = require("mongodb");
const debug = require("debug")("app:module-database");
const { Config } = require("../config");

let connection = null;
const getDatabaseCollection = (collection) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!connection) {
        const client = new MongoClient(Config.mongoDbUri);
        connection = await client.connect();
        debug("DB connecton established");
      }
      const db = connection.db(Config.mongoDbName);
      resolve(db.collection(collection));
    } catch (e) {
      reject(e);
    }
  });

module.exports = {
  Database: getDatabaseCollection,
};
