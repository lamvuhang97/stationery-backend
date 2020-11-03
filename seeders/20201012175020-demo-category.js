'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'book',
        categorysumId: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'notebook',
        categorysumId: 1,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'paper',
        categorysumId: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pen',
        categorysumId: 4,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sticker',
        categorysumId: 2,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'other',
        categorysumId: 5,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },


    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {})
  }
}
