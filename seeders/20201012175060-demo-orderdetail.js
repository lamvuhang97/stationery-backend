'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orderdetails', [
      {
        orderId: 1,
        productId: 1,
        productAmount: 1,
        productPrice: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 1,
        productId: 3,
        productAmount: 2,
        productPrice: 3200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 1,
        productAmount: 1,
        productPrice: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 3,
        productAmount: 1,
        productPrice: 3200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 4,
        productAmount: 1,
        productPrice: 11000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orderdetails', null, {})
  }
}
