const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      index: false,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      index: false,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    birth: {
      type: Date,
      required: true,
      index: false,
    },
    isPlaySport: {
      type: Boolean,
      required: true,
    },
    gender: {
      type: Boolean,
      required: true,
    },
    whereLive: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
