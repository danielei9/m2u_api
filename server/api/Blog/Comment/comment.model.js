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
     // Comment.hasOne(models.likesComment);
    }
  }

  Comment.init({
    text: DataTypes.TEXT,
  //  id_user: DataTypes.INTEGER // para saber de quien es
  }, {
    sequelize,
    freezeTableName: true,
  });
  return Comment;
};

