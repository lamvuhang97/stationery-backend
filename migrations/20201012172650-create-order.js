'use strict';

const { UnavailableForLegalReasons } = require("http-errors");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      phonenumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id'
        }
      },
      paymentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Payments',
          key: 'id'
        }
      },
      orderNote: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL
      },
      ship: {
        type: Sequelize.DECIMAL
      },
      ownerAdd: {
        type: Sequelize.STRING
      },
      ownerPhone: {
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
    await queryInterface.dropTable('Orders');
  }
};