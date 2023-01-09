const router = require("express").Router();
const heartbeatApi = require("../controllers/apis/heartbeat.api");

router.get("/", heartbeatApi.getHeartbeatByUser);
router.post("/", heartbeatApi.addHeartbeatByUser);

module.exports = router;
