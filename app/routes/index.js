const AuthApiRouter = require("./authPageRoute");
const AuthPageRouter = require("./authApiRoute");

function routes(app) {
  app.use("/page/auth", AuthPageRouter);
  app.use("/api/auth", AuthApiRouter);
}

module.exports = routes;
