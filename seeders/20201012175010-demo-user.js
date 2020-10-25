'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        password: '$2y$12$29oFnKTDfyvr8GCD2icoh.GIiRcmiG1Ban/GtdUXMbkpoBT90L0Xu',
        email: 'admin@gmail.com',
        roleId: 1,
        phonenumber: '0123456789',
        address: 'aaa',
        status: true,
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user01',
        password: '$2y$12$29oFnKTDfyvr8GCD2icoh.GIiRcmiG1Ban/GtdUXMbkpoBT90L0Xu',
        email: 'user01@gmail.com',
        roleId: 2,
        phonenumber: '0123456788',
        address: 'quang nam',
        status: true,
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user02',
        password: '$2y$12$29oFnKTDfyvr8GCD2icoh.GIiRcmiG1Ban/GtdUXMbkpoBT90L0Xu',
        email: 'user02@gmail.com',
        roleId: 2,
        phonenumber: '0123456787',
        address: 'bbb',
        status: true,
        avatar: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user03',
        password: '$2y$12$29oFnKTDfyvr8GCD2icoh.GIiRcmiG1Ban/GtdUXMbkpoBT90L0Xu',
        email: 'user03@gmail.com',
        roleId: 2,
        phonenumber: '0123456786',
        address: 'qccc',
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
