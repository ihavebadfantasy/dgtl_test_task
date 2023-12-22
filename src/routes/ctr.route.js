const express = require("express");
const validateQuery = require("../middlewares/validateQuery.js");
const ctrController = require("../controllers/ctr.controller.js");
const ctrValidation = require("../validations/ctr.validation.js");

const router = express.Router();

router
  .route("/")
  .get(validateQuery(ctrValidation.getCTR), ctrController.getCTR);

module.exports = router;
