const ApplicationError = require("../error/application-error");
const {
  InvalidTokenError,
  UnauthorizedError,
} = require("express-oauth2-jwt-bearer");

function errorHandler(err, request, response, next) {
  if (err instanceof ApplicationError) {
    return response.status(err.status).send({
      error: {
        code: err.code,
        message: err.message,
        status: err.status,
      },
    });
  } else if (err instanceof InvalidTokenError) {
    return response.status(401).send({
      error: {
        code: "invalidToken",
        message: {
          en: "Provided token is not valid.",
          cs: "Poskytnutý token není platný.",
        },
        status: 401,
      },
    });
  } else if (err instanceof UnauthorizedError) {
    return response.status(401).send({
      error: {
        code: "unauthorizedAccess",
        message: {
          en: "Unauthorized access to endpoint.",
          cs: "Neoprávněný přístup k funkčnosti.",
        },
        status: 401,
      },
    });
  }
  return response.status(500).send({
    error: {
      code: "unexpectedError",
      message: {
        en: "Unexpected error ocurred.",
        cs: "Nastala neočekávaná chyba.",
      },
      status: 500,
    },
  });
}

module.exports = errorHandler;
