const AuthPageRouter = require("./authPageRoute");
const AuthApiRouter = require("./authApiRoute");
const HeartbeatApiRouter = require("./heartbeatApiRoute");
const HeartbeatPageRouter = require("./heartbeatPageRoute");

function routes(app) {
  //for page
  app.use("/page/auth", AuthPageRouter);
  app.use("/page/heartbeat", HeartbeatPageRouter);
  // for api
  app.use("/api/auth", AuthApiRouter);
  app.use("/api/heartbeat", HeartbeatApiRouter);
}

module.exports = routes;
