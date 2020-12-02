'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
      Product.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner'
      });
      Product.hasMany(models.Cart, {
        foreignKey: 'productId',
        as: 'carts'
      });
      Product.hasMany(models.Orderdetail, {
        foreignKey: 'productId',
        as: 'orderdetails'
      });
      Product.hasMany(models.Productimage, {
        foreignKey: 'productId',
        as: 'images'
      })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    sold: DataTypes.INTEGER,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};



