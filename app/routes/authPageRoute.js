const router = require("express").Router();
const AuthPage = require("../controllers/pages/AuthPage");

router.get("/login", AuthPage.LoginPage);
router.get("/register", AuthPage.RegisterPage);

module.exports = router;
