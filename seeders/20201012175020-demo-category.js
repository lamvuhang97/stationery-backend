'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'book',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'notebook',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'paper',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pen',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'sticker',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'other',
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
