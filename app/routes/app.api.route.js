const router = require("express").Router();
const AppApiController = require("../controllers/apis/app.api");

router.post("/login", AppApiController.logIn);
router.post("/register", AppApiController.registerUser);

module.exports = router;
