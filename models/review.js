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
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Review.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      })
    }
  };
  Review.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};