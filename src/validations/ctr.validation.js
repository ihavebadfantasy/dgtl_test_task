const Joi = require("joi");

const getCTR = Joi.object().keys({
  date: Joi.date().required(),
});

module.exports = {
  getCTR,
};
