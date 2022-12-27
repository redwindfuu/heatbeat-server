const mongoose = require("mongoose");
const { DB } = require("./config");

async function connect() {
  mongoose.set("strictQuery", false);
  mongoose.connect(DB.url, {
    useNewUrlParser: true,
    retryWrites: true,
    w: "majority",
  });
}

module.exports = { connect };
