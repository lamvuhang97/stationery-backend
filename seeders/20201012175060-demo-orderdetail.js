'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orderdetails', [
      {
        orderId: 1,
        productId: 1,
        productAmount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 1,
        productId: 3,
        productAmount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 1,
        productAmount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 3,
        productAmount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 4,
        productAmount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orderdetails', null, {})
  }
}
