const express = require("express");

const { SalesController } = require("./controller");

const router = express.Router();

module.exports.SalesAPI = () => {
  router
    .get("/", SalesController.getSales)
    .get("/:id", SalesController.getSale)
    .post("/", SalesController.createSale)
    .put("/:id", SalesController.updateSale)
    .patch("/:id", SalesController.updateSaleStatus);

  return router;
};
