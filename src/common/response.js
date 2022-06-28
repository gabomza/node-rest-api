const httpErrors = require("http-errors");

module.exports.Response = {
  succes: (res, status = 200, message = "OK", body = {}) => {
    res.status(status).json({
      message,
      body,
    });
  },
  error: (res, error = null) => {
    let { statusCode, message } = new httpErrors.InternalServerError();
    if (error) {
      statusCode = error.statusCode;
      message = error.message;
      if (!statusCode) {
        statusCode = 500;
      }
      if (!message && error.Error) {
        message = error.error;
      }
    }
    res.status(statusCode).json({ message });
  },
};
