const router = require("express").Router();
const AuthApiController = require("../controllers/apis/auth.api");
const passport = require("../utils/passport");

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/page/auth/login?error=1",
    failureMessage: true,
  }),
  AuthApiController.loginApi
);
router.post("/register", AuthApiController.registerApi);
router.post("/logout", AuthApiController.logoutApi);

module.exports = router;
