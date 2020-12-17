'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        History.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order'
        })
        History.belongsTo(models.Status, {
            foreignKey: 'statusId',
            as: 'status'
        })
    }
  };
  History.init({
    orderId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    detail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};