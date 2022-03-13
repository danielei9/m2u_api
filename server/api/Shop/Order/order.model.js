'use strict';
//sequelize model:generate --name role.model --attributes name:string

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //relacion orderDetails con order 

      //relacion order con user 
      Order.belongsTo(models.user, {
        foreignKey: {
          // name: 'uid',
          allowNull: false
        }
      });
      Order.belongsTo(models.shop, {
        foreignKey: {
          // name: 'uid',
          allowNull: false
        }
      });
      Order.hasOne(models.review, {
        foreignKey: {
          allowNull: false
        }
      });
      Order.hasOne(models.promotion);
      Order.hasMany(models.orderDetails, {
        foreignKey: {
          allowNull: false
        }
      });
      Order.hasOne(models.orderAddress, {
        foreignKey: {
          unique: true,
          allowNull: false
        }
      });

    }
  }
  Order.init({
    dateBuy: DataTypes.STRING,
    dateSend: DataTypes.STRING,
    timeRecived: DataTypes.STRING,
    amount: DataTypes.STRING,
    shipName: DataTypes.STRING,
    shipAddres: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    shippingCost: DataTypes.STRING,
    tax: DataTypes.STRING,
    email: DataTypes.STRING,
    date: DataTypes.STRING,
    shipped: DataTypes.BOOLEAN,
    trackNumber: DataTypes.STRING,
    price: DataTypes.FLOAT,
    sku: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
  });

  return Order;
};