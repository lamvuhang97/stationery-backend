'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        productId: 1,
        userId: 4,
        rate: 5,
        content: 'good',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        userId: 4,
        rate: 5,
        content: 'hang giong hinh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        userId: 4,
        rate: 5,
        content: 'shop dong goi ky cang',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {})
  }
}
