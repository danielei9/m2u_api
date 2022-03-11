'use strict';
//sequelize model:generate --name role.model --attributes name:string
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCategory.belongsTo(models.product);

    }
  }
  ProductCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
  });
  return ProductCategory;
};