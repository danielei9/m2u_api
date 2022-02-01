module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "ER28-0652",
  DB: "m2u",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
