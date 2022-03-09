'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     // Post.belongsTo(models.Artist);
     // Post.hasMany(models.song);
    }
  }

  Post.init({
    name: DataTypes.STRING,
    year: DataTypes.STRING
  //  id_user: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Post;
};

