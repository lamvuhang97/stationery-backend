'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Order.belongsTo(models.Status, {
            foreignKey: 'statusId',
            as: 'status'
        })

        Order.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        })

        Order.hasMany(models.Orderdetail, {
          foreignKey: 'orderId',
          as: 'orderdetails'
        })
    }
  };
  Order.init({
    userId: DataTypes.INTEGER,
    phonenumber: DataTypes.STRING,
    address: DataTypes.STRING,
    statusId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    orderNote: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};