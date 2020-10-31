'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/stationery-images.appspot.com/o/Untitled%20Diagram.png?alt=media&token=d155c24d-0911-4005-a7f4-e3facd1a28d2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: "https://firebasestorage.googleapis.com/v0/b/stationery-images.appspot.com/o/2b2b1110569856cc7b4962abf6695e9c.jpg?alt=media&token=558472c1-2e4f-4266-920b-297e65bbdb70",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {})
  }
}
