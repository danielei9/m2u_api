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
const Genre = db.genre;

// PONER PARA CREAR TABLAS
//db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to M2U application." });
});

// routes
require('./api/User/Artist/artist.routes')(app);
require('./api/User/Auth/auth.routes')(app);
require('./api/User/User/user.routes')(app);

require('./api/Music/Song/song.routes')(app);
require('./api/Music/Disk/disk.routes')(app);
require('./api/Music/Playlist/playlist.routes')(app);
require('./api/Music/Genres/genre.routes')(app);

require('./api/Blog/blog.routes')(app);
require('./api/Blog/Comment/comment.routes')(app);
require('./api/Blog/Post/post.routes')(app);

require('./api/Shop/Faq/faq.routes')(app);
require('./api/Shop/Order/order.routes')(app);
require('./api/Shop/OrderAddress/orderAddress.routes')(app);
require('./api/Shop/OrderDetails/orderDetails.routes')(app);
require('./api/Shop/Product/product.routes')(app);
require('./api/Shop/ProductCategory/productCategory.routes')(app);
require('./api/Shop/Promotion/promotion.routes')(app);
require('./api/Shop/Review/review.routes')(app);
require('./api/Shop/Shop/shop.routes')(app);

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
  Genre.create({name: "POP"})
  Genre.create({name: "RAP"})
  Genre.create({name: "R&B"})
}

// force: true will drop the table if it already exists

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
initial();
});
/**/
module.exports = app
