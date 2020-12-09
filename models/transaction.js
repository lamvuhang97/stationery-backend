'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Transaction.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
    }
  };
  Transaction.init({
    userId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};