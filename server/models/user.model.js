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
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    artist_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    pswd: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};