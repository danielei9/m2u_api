'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderAddress.belongsTo(models.order, {
        foreignKey: {
         // name: 'uid',
          allowNull: false
        }
      });
      //OrderAddress.hasMany(models.song);
    }
  }

  OrderAddress.init({
    //name: DataTypes.STRING,
    //year: DataTypes.STRING
  //  id_user: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return OrderAddress;
};

