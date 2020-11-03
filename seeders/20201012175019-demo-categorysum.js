'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categorysums', [
      {
        name: 'book',
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
        name: 'bag',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'accessories',
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
    return queryInterface.bulkDelete('Categorysums', null, {})
  }
}
