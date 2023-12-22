const catchAsync = require("../utils/catchAsync");
const ctrService = require("../services/ctr.service.js");

const getCTR = catchAsync(async (req, res) => {
  const result = await ctrService.getCTR(req.query.date);
  res.send(result);
});

module.exports = {
  getCTR,
};
