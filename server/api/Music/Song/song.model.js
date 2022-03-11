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
      Song.belongsTo(models.disk, {
        foreignKey: {
         // name: 'uid',
          allowNull: false
        }
      });
      Song.belongsToMany(models.user, {
        through: "reproductions",
        foreignKey: "songId",
        otherKey: "userId"
      }); 
     // Song.hasMany(models.artist);
      //Song.hasMany(models.artist, {as: 'ifYouWantAlias', constraints: false, allowNull:true, defaultValue:null});

     /* Song.belongsToMany(models.Playlist, {
        through: "list_song",
        foreignKey: "songId",
        otherKey: "playlistId"
      });*/
      Song.belongsToMany(models.user, {
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