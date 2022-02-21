'use strict';
//sequelize model:generate --name role.model --attributes name:string
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.Disk);
      Song.belongsToMany(models.User, {
        through: "reproductions",
        foreignKey: "songId",
        otherKey: "userId"
      });
      Song.belongsToMany(models.Playlist, {
        through: "list_song",
        foreignKey: "songId",
        otherKey: "playlistId"
      });
      Song.belongsToMany(models.User, {
        through: "like_song",
        foreignKey: "songId",
        otherKey: "userId"
      });
    }
  }
  Song.init({
    name: DataTypes.STRING,
    duration: DataTypes.STRING
    // id_disk: DataTypes.INTEGER

  }, {
    sequelize,
    freezeTableName: true,
  });
  return Song;
};