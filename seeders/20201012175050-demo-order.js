'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [
      {
        userId: 2,
        ownerId : 3,
        phonenumber: '0123456788',
        address: 'quang nam',
        statusId: 1,
        paymentId: 1,
        orderNote: 'ship gio hanh chinh',
        total: 6400,
        ship: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        ownerId: 2,
        phonenumber: '0123456786',
        address: 'qccc',
        statusId: 4,
        paymentId: 2,
        orderNote: null,
        total: 24200,
        ship: 20000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {})
  }
}
