'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.post);
      Comment.belongsTo(models.user);
      Comment.belongsTo(models.comment,{as:"Parent"});
     // Comment.hasOne(models.likesComment);
    }
  }

  Comment.init({
    title: DataTypes.TEXT,
    published: DataTypes.BOOLEAN,
    content: DataTypes.TEXT,
    publishedAt: { type: DataTypes.DATE, defaultValue: sequelize.NOW }
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Comment;
};

