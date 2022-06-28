const { SalesService } = require("./services");
const debug = require("debug")("app:salesController");

const { Response } = require("../common/response");
const httpErrors = require("http-errors");

module.exports.SalesController = {
  getSales: async (req, res) => {
    try {
      // const sales = await SalesService.getAll();
      const sales = await SalesService.getAllAggregate();
      Response.succes(res, 200, "Sales List", sales);
    } catch (error) {
      debug("Error retrieving sales", error);
      Response.error(res);
    }
  },
  getSale: async (req, res) => {
    try {
      const { params: id } = req;
      sale = await SalesService.getById(id);
      if (!sale) {
        Response.error(res, new httpErrors.NotFound());
        return;
      }
      Response.succes(res, 200, `Sale id ${sale._id}`, sale);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createSale: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length !== 3) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const insertedId = await SalesService.create(body);
        Response.succes(res, 201, "Inserted ID", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res, error);
    }
  },
  updateSale: async (req, res) => {
    try {
      const { body, params: id } = req;
      if (!body || Object.keys(body).length !== 3 || !id) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const result = await SalesService.update(id, body);
        Response.succes(res, 200, `Updated sale ${id.id}`, result);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateSaleStatus: async (req, res) => {
    try {
      const { body, params: id } = req;
      if (!id && !body.status) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const sale = SalesService.getById(id);
        if (!sale) {
          Response.error(res, new httpErrors.NotFound());
          return;
        }

        sale.status = body.status;

        const result = await SalesService.update(id, sale);
        Response.succes(res, 200, `Cancelled sale ${id.id}`, result);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
