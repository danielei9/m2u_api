import pino from 'pino';
import'./env.js';

const l = pino({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
  //level: "debug",
});

export default l;
