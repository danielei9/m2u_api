'use strict';
//sequelize model:generate --name role.model --attributes name:string

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //asociar a productCategory
      Product.belongsTo(models.shop, {
        foreignKey: {
          // name: 'uid',
          allowNull: false
        }
      });
      Product.belongsToMany(models.productCategory, {
        through: "product_productCategory",
        foreignKey: "ProductId",
        otherKey: "ProductCategoryId",
        timestamps: false
      });
      Product.hasMany(models.faq);
      Product.hasMany(models.review, {
        foreignKey: {
          allowNull: false
        }
      });
      Product.hasMany(models.orderDetails, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }
  Product.init({
    price: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    options: DataTypes.JSON
    // example  options: {"color": "rojo","talla": "M"}
    // example  options: {"color": ["rojo","azul"..."negro"],"talla": ["S","M"..."XL"]}
  }, {
    sequelize,
    freezeTableName: true
  });
  return Product;
};