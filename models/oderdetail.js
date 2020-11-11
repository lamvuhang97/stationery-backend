'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orderdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orderdetail.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      Orderdetail.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      })
    }
  };
  Orderdetail.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productAmount: DataTypes.INTEGER,
    productPrice: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Orderdetail',
  });
  return Orderdetail;
};