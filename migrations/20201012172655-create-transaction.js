'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
          type: Sequelize.INTEGER
      },
      orderId: {
          type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      amount: {
          type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
          type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};