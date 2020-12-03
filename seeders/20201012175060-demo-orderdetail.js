'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orderdetails', [
      {
        orderId: 1,
        productId: 3,
        productAmount: 2,
        productPrice: 3200,
        isReview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 1,
        productAmount: 1,
        productPrice: 10000,
        isReview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 2,
        productAmount: 1,
        productPrice: 3200,
        isReview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 4,
        productAmount: 1,
        productPrice: 11000,
        isReview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orderdetails', null, {})
  }
}
