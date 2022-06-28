const { UsersService } = require("./services");
const debug = require("debug")("app:usersController");

const { Response } = require("../common/response");
const httpErrors = require("http-errors");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      const users = await UsersService.getAll();
      Response.succes(res, 200, "Users List", users);
    } catch (error) {
      debug("Error retrieving users", error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const { params: id } = req;
      user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new httpErrors.NotFound());
        return;
      }
      Response.succes(res, 200, `User id ${user._id}`, user);
    } catch (error) {
      console.log("catch");
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length !== 4) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        Response.succes(res, 201, "Inserted ID", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { body, params: id } = req;
      if (!body || Object.keys(body).length !== 3 || !id) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const result = await UsersService.update(id, body);
        Response.succes(res, 200, `Updated user ${id.id}`, result);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { params: id } = req;
      if (!id) {
        Response.error(res, new httpErrors.BadRequest());
      } else {
        const deletedCount = await UsersService.remove(id);
        if (deletedCount === 1) {
          Response.succes(res, 200, `User ${id.id} successfully removed.`);
        } else {
          Response.error(res, new httpErrors.NotFound());
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
