'use strict';
//sequelize model:generate --name role.model --attributes name:string

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Artist.hasMany(models.disk);
      Artist.belongsTo(models.user);
    }
  }
  Artist.init({
    biography: DataTypes.STRING,
    artistName: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true
  });
  return Artist;
};