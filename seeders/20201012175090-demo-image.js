'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/stationery-images.appspot.com/o/2b2b1110569856cc7b4962abf6695e9c.jpg?alt=media&token=40597ce4-f6b6-4ce5-b581-a01e1430bbcd",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/stationery-images.appspot.com/o/Untitled%20Diagram.png?alt=media&token=e0f0d16a-0cdd-4366-8b0d-45198c552b25",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {})
  }
}
