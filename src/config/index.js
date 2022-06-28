require("dotenv").config();

module.exports.Config = {
  port: process.env.PORT,
  mongoDbUri: process.env.MONGO_DB_URI,
  mongoDbName: process.env.MONGO_DB_NAME,
};
