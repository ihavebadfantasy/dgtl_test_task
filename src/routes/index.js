const express = require("express");
const statsRoute = require("./stats.route.js");
const ctrRoute = require("./ctr.route.js");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/stats",
    route: statsRoute,
  },
  {
    path: "/ctr",
    route: ctrRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
