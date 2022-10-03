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
      Blog.belongsTo(models.user);
      Blog.belongsTo(models.artist);
      Blog.hasMany(models.post, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }

  Blog.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    //tags: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Blog;
};

