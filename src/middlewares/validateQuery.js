const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const validateQuery = (schema) => (req, res, next) => {
  const { _value, error } = Joi.compile(schema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(req.query);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");

    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  return next();
};

module.exports = validateQuery;
