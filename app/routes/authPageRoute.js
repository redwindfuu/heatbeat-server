const router = require("express").Router();
const AuthPage = require("../controllers/pages/authPage");

router.get("/login", AuthPage.LoginPage);
router.get("/register", AuthPage.RegisterPage);

module.exports = router;
