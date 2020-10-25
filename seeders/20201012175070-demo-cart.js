'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Carts', [
      {
        userId: 2,
        productId: 1,
        productAmount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 2,
        productAmount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 3,
        productAmount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        productId: 2,
        productAmount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        productId: 1,
        productAmount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        productId: 5,
        productAmount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {})
  }
}
