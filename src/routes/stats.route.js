const express = require("express");
const validateQuery = require("../middlewares/validateQuery.js");
const statsController = require("../controllers/stats.controller.js");
const statsValidation = require("../validations/stats.validation.js");

const router = express.Router();

router
  .route("/")
  .get(validateQuery(statsValidation.getStats), statsController.getStats);

module.exports = router;
