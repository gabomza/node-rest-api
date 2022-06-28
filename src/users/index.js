const express = require("express");

const { UsersController } = require("./controller");

const router = express.Router();

module.exports.UsersAPI = () => {
  router
    .get("/", UsersController.getUsers)
    .get("/:id", UsersController.getUser)
    .post("/", UsersController.createUser)
    .put("/:id", UsersController.updateUser)
    .delete("/:id", UsersController.deleteUser);

  return router;
};
