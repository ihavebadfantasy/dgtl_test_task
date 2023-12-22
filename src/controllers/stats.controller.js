const catchAsync = require("../utils/catchAsync");
const statsService = require("../services/stats.service.js");

const getStats = catchAsync(async (req, res) => {
  const result = await statsService.getStats(req.query.to, req.query.from);
  res.send(result);
});

module.exports = {
  getStats,
};
