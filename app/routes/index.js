const AuthPageRouter = require("./auth.page.route");
const AppApiRouter = require("./app.api.route");
const AuthApiRouter = require("./auth.api.route");
const HeartbeatApiRouter = require("./heartbeat.api.route");
const HeartbeatPageRouter = require("./heartbeat.page.route");

function routes(app) {
  //for page
  app.use("/page/auth", AuthPageRouter);
  app.use("/page/heartbeat", HeartbeatPageRouter);
  // for api
  app.use("/api/auth", AuthApiRouter);
  app.use("/api/app", AppApiRouter);
  app.use("/api/heartbeat", HeartbeatApiRouter);
}

module.exports = routes;
