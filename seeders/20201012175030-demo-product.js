'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'book1',
        ownerId: 2,
        categoryId: 1,
        price: 10000,
        quantity: 23,
        description: 'book book book book book book',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'book2',
        ownerId: 2,
        categoryId: 1,
        price: 17000,
        quantity: 15,
        description: 'book2 book2 book2 book2 book book',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'pen1',
        ownerId: 3,
        categoryId: 4,
        price: 3200,
        quantity: 45,
        description: 'pen pen pen pen pen',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'paper1',
        ownerId: 2,
        categoryId: 3,
        price: 11000,
        quantity: 100,
        description: 'paperpaper paper paper paper',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'book3',
        ownerId: 4,
        categoryId: 1,
        price: 98000,
        quantity: 2,
        description: 'book3 book 3book3 3book3 book book',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
}
