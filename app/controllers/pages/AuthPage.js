var hb = require("express-handlebars").create();
//URL: page/auth/login
const LoginPage = async (req, res, next) => {
  try {
    res.render("pages/login", { title: "Login Page" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  LoginPage,
};
