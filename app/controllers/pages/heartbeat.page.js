module.exports = {
  getHeartbeatPage: async function (req, res) {
    res.render("pages/heartbeat", { title: "Heartbeat" });
  },
};
