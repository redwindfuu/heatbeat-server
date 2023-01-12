const Users = require("../../models/user.model");
const HeartBeatModel = require("../../models/heartbeat.model");
const { calHealth } = require("../../utils/estimateHealth");

module.exports = {
  getHeartbeatPage: async function (req, res) {
    let userId = req.session.userId;
    req.session.userId = null;
    console.log(userId);

    const user = await Users.findOne({ _id: userId });
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
      let now = new Date();
      let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      let nextDay = new Date();
      nextDay.setDate(today.getDate() + 1);
      const heartbeatList = await HeartBeatModel.find({
        userId,
        createdAt: {
          $gte: today,
          $lt: nextDay,
        },
      });
      // if (heartbeatList.length <= 10) {
      //   return res.status(200).json({
      //     status: "fail",
      //     message: "Too little data to report",
      //   });
      // }

      const healthInfo = calHealth(heartbeatList, user);
      let avg_beat =
        heartbeatList.reduce((a, b) => a + b.beat, 0) /
        heartbeatList.length;
    res.render("pages/heartbeat", { user: user });
  },
};
