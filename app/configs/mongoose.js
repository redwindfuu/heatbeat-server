const mongoose = require("mongoose");
const { DB } = require("./config");

async function connect() {
  console.log("DB", DB.url);
  mongoose.set("strictQuery", false);
  await mongoose.connect(DB.url, {
    useNewUrlParser: true,
    retryWrites: true,
    w: "majority",
  });
}

module.exports = { connect };
