'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [
      {
        userId: 2,
        phonenumber: '0123456788',
        address: 'quang nam',
        statusId: 1,
        totalPrice: 16400,
        orderNote: 'ship gio hanh chinh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        phonenumber: '0123456786',
        address: 'qccc',
        statusId: 4,
        totalPrice: 24200,
        orderNote: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {})
  }
}
