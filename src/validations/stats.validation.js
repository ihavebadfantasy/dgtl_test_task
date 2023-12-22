const Joi = require("joi");

const getStats = Joi.object().keys({
  from: Joi.date().required(),
  to: Joi.date().required(),
});

module.exports = {
  getStats,
};
