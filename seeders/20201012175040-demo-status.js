'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Statuses', [
      {
        name: 'waiting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'accept',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'reject',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'success',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'fail',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Statuses', null, {})
  }
}
