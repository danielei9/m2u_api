'use strict';
//sequelize model:generate --name role.model --attributes name:string

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shop.hasMany(models.order, {
        foreignKey: {
          // name: 'uid',
          allowNull: false
        }
      });
      Shop.hasMany(models.product, {
        foreignKey: {
          // name: 'uid',
          allowNull: false
        }
      });
      Shop.belongsTo(models.artist, {
        foreignKey: {
          // name: 'uid',
          unique: true,
          allowNull: false
        }
      });

      Shop.belongsToMany(models.promotion, {
        through: "shopPromotion",
        foreignKey: "shopId",
        otherKey: "promotionId"
      });
      // Shop.belongsTo(models.user);
    }
  }
  Shop.init({
    color: DataTypes.STRING,
    headerImg: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName: true
  });
  return Shop;
};  