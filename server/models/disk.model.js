'use strict';
const { user } = require("../models/user.model.js");

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
    }
  }

  Disk.init({
    name: DataTypes.STRING,
    year: DataTypes.STRING,
    name: DataTypes.STRING,
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'disks',
  });
  return Disk;
};