const mongoose = require("mongoose");
const { Schema } = mongoose;

const HeartBeatSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    beat: {
      type: Schema.Types.Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const HeartBeatModel = mongoose.model("heartbeats", HeartBeatSchema);

module.exports = HeartBeatModel;
