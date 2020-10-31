'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productimage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Productimage.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
      Productimage.belongsTo(models.Image, {
        foreignKey: 'imageId',
        as: 'url'
      });
    }
  };
  Productimage.init({
    productId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productimage',
  });
  return Productimage;
};



