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
      Song.hasMany(models.post);

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
      Song.belongsToMany(models.genre, {
        through: "genre_song",
        foreignKey: "SongId",
        otherKey: "GenreId",
        timestamps: false
      });
      Song.belongsToMany(models.user, {
        through: "like_song",
        foreignKey: "songId",
        otherKey: "userId"
      });
    }
  }
  Song.init({
    name: DataTypes.STRING,
    duration: DataTypes.STRING,
    
    // id_disk: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Song;
};