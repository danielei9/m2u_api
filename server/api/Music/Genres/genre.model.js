'use strict';
//sequelize model:generate --name role.model --attributes name:string
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Genre.belongsToMany(models.song, {
        through: "genre_song",
        foreignKey: "GenreId",
        otherKey: "SongId",
        timestamps: false
      });
    }
  }
  Genre.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Genre;
};