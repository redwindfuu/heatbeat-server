const Users = require("../../models/user.model");
const HeartBeatModel = require("../../models/heartbeat.model");
const { calHealth } = require("../../utils/estimateHealth");

module.exports = {
  getHeartbeatPage: async function (req, res) {
    let userId = req.session.userId;

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

    let healthInfo = null;
    if (heartbeatList.length > 10) {
      healthInfo = calHealth(heartbeatList, user);
    }

    let avg_beat = heartbeatList.length > 0 ?
      heartbeatList.reduce((a, b) => a + b.beat, 0) /
      heartbeatList.length : 0;

    let data = {
      name: user.name,
      username: user.username,
      gender: user.gender ? 'Nam' : 'Nữ',
      isPlaySport: user.isPlaySport ? 'Có' : 'Không',
      whereLive: user.whereLive === 'delta' ? 'Đồng bằng' : (user.whereLive === 'plateau' ? 'Cao nguyên' : 'Vùng cao'),
      avg_beat,
      length: heartbeatList.length,
      healthInfo: healthInfo ? {
        messages: healthInfo.message,        
        evaluate: healthInfo.evaluate,
      } : null,
    };

    res.render("pages/heartbeat", { data: data });
  },
};
