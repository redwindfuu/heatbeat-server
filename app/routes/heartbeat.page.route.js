const router = require("express").Router();
const heartbeatPage = require("../controllers/pages/heartbeat.page.js");

router.get("/", heartbeatPage.getHeartbeatPage);

module.exports = router;
