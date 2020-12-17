'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Payments', [
      {
        name: 'COD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Paypal',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Payments', null, {})
  }
}
