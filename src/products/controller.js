const { ProductsService } = require("./services");
const debug = require("debug")("app:productsController");

const { Response } = require("../common/response");
const httpErrors = require("http-errors");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      const products = await ProductsService.getAll();
      Response.succes(res, 200, "Products List", products);
    } catch (error) {
      debug("Error retrieving products", error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const { params: id } = req;
      product = await ProductsService.getById(id);
      if (!product) {
        // Response.error(res, { statusCode: 404, message: "Product not found." });
        Response.error(res, new httpErrors.NotFound());
        return;
      }
      Response.succes(res, 200, `Product id ${product._id}`, product);
    } catch (error) {
      console.log("catch");
      debug(error);
      Response.error(res);
    }
  },
  createProduct: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length !== 3) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.succes(res, 201, "Inserted ID", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { body, params: id } = req;
      if (!body || Object.keys(body).length !== 3 || !id) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const result = await ProductsService.update(id, body);
        Response.succes(res, 200, `Updated product ${id.id}`, result);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { params: id } = req;
      if (!id) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const deletedCount = await ProductsService.remove(id);
        if (deletedCount === 1) {
          Response.succes(res, 200, `Product ${id.id} successfully removed.`);
        } else {
          Response.error(res, new httpErrors.NotFound());
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  generateReport: async (req, res) => {
    try {
      await ProductsService.generateReport("Products-Report", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
