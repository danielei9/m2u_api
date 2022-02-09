const express = require("express");
//const cors = require("cors");
const logger = require('pino-http')()

const errorHandler = require('./api/middlewares/error.handler')
const app = express();
/*
var corsOptions = {
  origin: "http://localhost:2210"
};
*/
//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(errorHandler);
app.use(logger)

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./models");
const Role = db.role;

// PONER PARA CREAR TABLAS
db.sequelize.sync();

// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to M2U application." });
});

// routes
require('./api/controllers/auth/auth.routes')(app);
require('./api/controllers/users/user.routes')(app);
require('./api/controllers/song/song.routes')(app);

// set port, listen for requests
//const PORT = process.env.PORT;
const PORT = 3000;
app.listen(PORT, () => {
    //logger.info('hello world')
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
//initial();
