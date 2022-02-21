'use strict';
//sequelize model:generate --name role.model --attributes name:string

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {

      Playlist.belongsTo(models.User);
      
      Playlist.belongsToMany(models.song, {
        through: "list_song",
        foreignKey: "playlistId",
        otherKey: "songId"
      });
        
      Playlist.belongsToMany(models.User, {
        through: "follower_lista",
        foreignKey: "playlistId",
        otherKey: "userId"
      });
    }
  }
  Playlist.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    follower: DataTypes.STRING
    // author: --> userId
  }, {
    sequelize,
    freezeTableName: true
  });
  return Playlist;
};