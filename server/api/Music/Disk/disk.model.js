'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disk.belongsTo(models.artist);
      Disk.hasMany(models.song, {
        foreignKey: {
         // name: 'uid',
          allowNull: false
        }
      });
      Disk.hasMany(models.post);
    }
  }

  Disk.init({
    name: DataTypes.STRING,
    label: DataTypes.STRING,
    year: DataTypes.STRING,
  //  id_user: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Disk;
};

