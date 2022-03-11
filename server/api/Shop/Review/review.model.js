'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.order, {
        foreignKey: {
          allowNull: false
        }
      });
      Review.belongsTo(models.product, {
        foreignKey: {
          allowNull: false
        }
      });
      /*Review.belongsTo(models.user, { LO RECOGE DEL ORDER
        foreignKey: {
          allowNull: false
        }
      });*/
    }
  }

  Review.init({
    //name: DataTypes.STRING,
    //year: DataTypes.STRING
    //  id_user: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Review;
};

