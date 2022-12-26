const VAR = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || "localhost",
};
const DB = {
  url: process.env.DB_URL || "mongodb://localhost:27017/heatbeat-server",
};

module.exports = { VAR, DB };
