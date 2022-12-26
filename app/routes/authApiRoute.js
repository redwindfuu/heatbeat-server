const router = require("express").Router();
const AuthApiController = require("../controllers/apis/AuthApi");

router.post("/login", AuthApiController.loginApi);

module.exports = router;
