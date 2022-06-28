const express = require("express");
const debug = require("debug")("app:main");

const { Config } = require("./src/config");
const { IndexAPI, NotFoundAPI } = require("./src/index");
const { ProductsAPI } = require("./src/products");
const { SalesAPI } = require("./src/sales");
const { UsersAPI } = require("./src/users");

const app = express();

app.use(express.json());

app.use("/", IndexAPI());
app.use("/api/products", ProductsAPI());
app.use("/api/users", UsersAPI());
app.use("/api/sales", SalesAPI());
app.use("/", NotFoundAPI());

app.listen(Config.port, () => {
  debug(`Server started in port ${Config.port}`);
});
