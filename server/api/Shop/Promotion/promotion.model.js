'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Promotion.belongsTo(models.order);
      //Promotion.hasMany(models.song);
      Promotion.belongsToMany(models.shop, {
        through: "shopPromotion",
        foreignKey: "promotionId",
        otherKey: "shopId"
      });
    }
  }

  Promotion.init({
    //name: DataTypes.STRING,
    //year: DataTypes.STRING
  //  id_user: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Promotion;
};