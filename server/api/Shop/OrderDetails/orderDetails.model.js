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
      OrderDetails.belongsTo(models.order, {
        foreignKey: {
          allowNull: false
        }
      });
      OrderDetails.belongsTo(models.product, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }
  OrderDetails.init({
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