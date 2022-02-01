const pino = require('pino')
const dotenv = require("dotenv")
dotenv.config();

const l = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
  //level: "debug",
});
module.exports = l;

