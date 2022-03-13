'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
const config = require("../config/db.config")
const db = {};

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      // max: config.pool.max,
      // min: config.pool.min,
      //acquire: config.pool.acquire,
      // idle: config.pool.idle
    }
  }
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//--------------------------------User--------------------------------
db.user = require("../api/User/User/user.model")(sequelize, Sequelize);
db.role = require("../api/User/Role/role.model.js")(sequelize, Sequelize);
db.artist = require("../api/User/Artist/artist.model.js")(sequelize, Sequelize);
//--------------------------------Music--------------------------------
db.disk = require("../api/Music/Disk/disk.model.js")(sequelize, Sequelize);
db.playlist = require("../api/Music/Playlist/playlist.model")(sequelize, Sequelize);
db.song = require("../api/Music/Song/song.model.js")(sequelize, Sequelize);
db.genre = require("../api/Music/Genres/genre.model.js")(sequelize, Sequelize);

//--------------------------------Blog--------------------------------
db.blog = require("../api/Blog/blog.model.js")(sequelize, Sequelize);
db.comment = require("../api/Blog/Comment/comment.model.js")(sequelize, Sequelize);
db.post = require("../api/Blog/Post/post.model.js")(sequelize, Sequelize);
//--------------------------------Shop--------------------------------
db.faq = require("../api/Shop/Faq/faq.model.js")(sequelize, Sequelize);
db.order = require("../api/Shop/Order/order.model.js")(sequelize, Sequelize);
db.orderAddress = require("../api/Shop/OrderAddress/orderAddress.model.js")(sequelize, Sequelize);
db.orderDetails = require("../api/Shop/OrderDetails/orderDetails.model.js")(sequelize, Sequelize)
db.product = require("../api/Shop/Product/product.model.js")(sequelize, Sequelize)
db.productCategory = require("../api/Shop/ProductCategory/productCategory.model.js")(sequelize, Sequelize)
db.promotion = require("../api/Shop/Promotion/promotion.model.js")(sequelize, Sequelize)
db.review = require("../api/Shop/Review/review.model.js")(sequelize, Sequelize)
db.shop = require("../api/Shop/Shop/shop.model.js")(sequelize, Sequelize)


/*
db.disk.hasMany(db.song, {
  foreignKey: 'id_disk'
});*/

//db.song.belongsTo(db.disk, {foreignKey : 'id_song'});
/*db.disk.belongsTo(db.user);
db.user.hasMany(db.disk);*/

//db.song.belongsTo(db.disk, {foreignKey: "id_disk"});
//db.disk.hasMany(db.song, {foreignKey: "id_disk"});

/*
db.user.associate = function(models) {
 
};

db.disk.associate = function(models) {
  db.disk.belongsTo(models.user, {
    foreignKey: 'id'
  });
};
*/

db.song.belongsToMany(db.artist, {
  through: "artist_in_song",
  foreignKey: "songId",
  otherKey: "artistId"
});
db.artist.belongsToMany(db.song, {
  through: "artist_in_song",
  foreignKey: "artistId",
  otherKey: "songId"
});
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];
/*
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
*/
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
