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

        Order.belongsTo(models.Payment, {
          foreignKey: 'paymentId',
          as: 'payment'
      })

        Order.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
        })

        Order.belongsTo(models.User, {
          foreignKey: 'ownerId',
          as: 'owner'
        })

        Order.hasMany(models.Orderdetail, {
          foreignKey: 'orderId',
          as: 'orderdetails'
        })

        Order.hasMany(models.Transaction, {
          foreignKey: 'orderId',
          as: 'transaction'
        })
    }
  };
  Order.init({
    userId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    phonenumber: DataTypes.STRING,
    address: DataTypes.STRING,
    statusId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    orderNote: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    ship: DataTypes.DECIMAL,
    ownerAdd: DataTypes.STRING,
    ownerPhone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};