'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });
      User.hasMany(models.Product, {
        foreignKey: 'ownerId',
        as: 'products'
      });
      User.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'orders'
      });
      User.hasMany(models.Address, {
        foreignKey: 'userId',
        as: 'address'
      });
      User.hasMany(models.Transaction, {
        foreignKey: 'userId',
        as: 'transaction'
      });
      User.hasMany(models.Cart, {
        foreignKey: 'userId',
        as: 'carts'
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
    wallet: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};