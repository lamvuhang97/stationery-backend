'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Productimages', [
      {
        productId: 1,
        imageId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        imageId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Productimages', null, {})
  }
}
