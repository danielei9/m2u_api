'use strict';
//sequelize model:generate --name role.model --attributes name:string

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //User.hasMany(models.disk);
      User.hasOne(models.Artist);
      User.hasOne(models.Playlist);

      User.belongsToMany(models.song, {
        through: "reproductions",
        foreignKey: "userId",
        otherKey: "songId"
      });

      User.belongsToMany(models.Playlist, {
        through: "follower_lista",
        foreignKey: "userId",
        otherKey: "playlistId"
      });
      
      User.belongsToMany(models.song, {
        through: "playlist_user",
        foreignKey: "userId",
        otherKey: "playlistId"
      });
      User.belongsToMany(models.song, {
        through: "like_song",
        foreignKey: "userId",
        otherKey: "songId"
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    pswd: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
  });
  // User.hasMany(disk, {foreignKey: 'id_user'});

  return User;
};