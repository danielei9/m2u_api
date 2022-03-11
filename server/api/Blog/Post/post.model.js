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
      Post.belongsTo(models.blog);
      Post.hasMany(models.comment, {
        foreignKey: {
          allowNull: false
        }
      });
      Post.belongsTo(models.disk);
    }
  }

  Post.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    //  BlogId: DataTypes.INTEGER
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Post;
};

