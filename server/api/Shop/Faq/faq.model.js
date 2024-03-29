'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Faq.belongsTo(models.user, {
        foreignKey: {
          allowNull: false
        }
      });
       Faq.belongsTo(models.product, {
        foreignKey: {
          allowNull: false
        }
      });
      //Faq.hasMany(models.song);
    }
  }

  Faq.init({
    //name: DataTypes.STRING,
    //year: DataTypes.STRING
  //  id_user: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Faq;
};

