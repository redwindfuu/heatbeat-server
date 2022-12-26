const usersRouter = require("./userRoute");

function routes(app) {
  app.use("/users", usersRouter);
}

module.exports = routes;
