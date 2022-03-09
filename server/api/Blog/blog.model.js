'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     // Blog.belongsTo(models.Artist);
      //Blog.hasMany(models.song);
    }
  }

  Blog.init({
    //name: DataTypes.STRING,
    //year: DataTypes.STRING
  //  id_user: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Blog;
};

