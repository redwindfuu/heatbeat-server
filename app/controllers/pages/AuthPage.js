//URL: page/auth/login
const LoginPage = async (req, res, next) => {
  try {
    res.render("pages/login", { title: "Login" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  LoginPage,
};
