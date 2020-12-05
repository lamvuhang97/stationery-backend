'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: '$2b$10$.E9dpeaLAlBA.Em/DqB.x.jsrPzOSBTwXbVg4rdiK88ghoOMKDttW',
        email: 'admin@gmail.com',
        roleId: 1,
        status: true,
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user01',
        password: '$2b$10$.E9dpeaLAlBA.Em/DqB.x.jsrPzOSBTwXbVg4rdiK88ghoOMKDttW',
        email: 'user01@gmail.com',
        roleId: 2,
        status: true,
        avatar: 'https://firebasestorage.googleapis.com/v0/b/stationery-images.appspot.com/o/2b2b1110569856cc7b4962abf6695e9c.jpg?alt=media&token=40597ce4-f6b6-4ce5-b581-a01e1430bbcd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user02',
        password: '$2b$10$.E9dpeaLAlBA.Em/DqB.x.jsrPzOSBTwXbVg4rdiK88ghoOMKDttW',
        email: 'user02@gmail.com',
        roleId: 2,
        status: true,
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user03',
        password: '$2b$10$.E9dpeaLAlBA.Em/DqB.x.jsrPzOSBTwXbVg4rdiK88ghoOMKDttW',
        email: 'user03@gmail.com',
        roleId: 2,
        status: true,
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
