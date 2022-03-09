'use strict';
//sequelize model:generate --name role.model --attributes name:string

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //relacion orderDetails con Product 
    }
  }
  OrderDetails.init({
    product: DataTypes.STRING,
    options: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.STRING,
    sku: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
  });

  return OrderDetails;
};