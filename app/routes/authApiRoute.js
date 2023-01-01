const router = require("express").Router();
const AuthApiController = require("../controllers/apis/AuthApi");

router.post("/login", AuthApiController.loginApi);
router.post("/register", AuthApiController.registerApi);

module.exports = router;
