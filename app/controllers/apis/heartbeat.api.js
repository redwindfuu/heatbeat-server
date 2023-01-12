const UserModel = require("../../models/user.model");
const HeartBeatModel = require("../../models/heartbeat.model");
const { calHealth } = require("../../utils/estimateHealth");

module.exports = {
  getHeartbeatByUser: async function (req, res) {
    try {
      const userId = req.user ? req.user._id : req.body.userId;
      const user = await UserModel.findOne({ _id: userId });
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
      if (heartbeatList.length <= 10) {
        return res.status(200).json({
          status: "fail",
          message: "Too little data to report",
        });
      }

      const healthInfo = calHealth(heartbeatList, user);
      console.log(heartbeatList[0].beat);
      let avg_beat =
        heartbeatList.reduce((a, b) => a + b.beat, 0) /
        heartbeatList.length;
      console.log("average" + avg_beat);
      const data = {
        userId: user.id,
        name: user.name,
        messages: healthInfo.message.join(', '),
        evaluate: healthInfo.evaluate,
        listHeartBeat: heartbeatList.splice(heartbeatList.length - 5, heartbeatList.length - 1),
      };
      return res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error,
      });
    }
  },
  addHeartbeatByUser: async function (req, res) {
    try {
      const userId = req.user ? req.user._id : req.body.userId;
      const { beat } = req.body;
      const user = await UserModel.findOne({ _id: userId });
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "User not found",
        });
      }
      const heartbeat = await HeartBeatModel.create({
        userId,
        beat,
      });
      return res.status(200).json({
        status: "success",
        data: heartbeat,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error,
      });
    }
  },

  getDatatableHeartBeats: async function (req, res) {
    try {
      const userId = req.query.userId;
      const user = await UserModel.findOne({ _id: userId });
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

      return res.json({
        data: heartbeatList
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error,
      });
    }
  },
};
