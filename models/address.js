'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Address.belongsTo(models.Province, {
        foreignKey: 'provinceId',
        as: 'province'
      });
      Address.belongsTo(models.District, {
        foreignKey: 'districtId',
        as: 'district'
      });
    }
  };
  Address.init({
    userId: DataTypes.INTEGER,
    phonenumber: DataTypes.STRING,
    provinceId: DataTypes.INTEGER,
    districtId: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    isDefault: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};



