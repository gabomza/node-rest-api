const express = require("express");

const { Response } = require("../common/response");
const httpErrors = require("http-errors");

module.exports.IndexAPI = () => {
  const router = express.Router();
  router.get("/", (req, res) => {
    const apis = {
      products: `https://${req.headers.host}/api/products`,
      users: `https://${req.headers.host}/api/users`,
      sales: `https://${req.headers.host}/api/sales`,
    };
    Response.succes(res, 200, "Products Management API", apis);
  });
  return router;
};

module.exports.NotFoundAPI = () => {
  const router = express.Router();
  router.all("*", (req, res) => {
    Response.error(res, new httpErrors.NotFound());
  });
  return router;
};
