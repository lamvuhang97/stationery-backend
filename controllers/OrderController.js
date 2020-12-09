const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
var sequelize = require('sequelize');
const { where } = require('sequelize');
const Op = sequelize.Op;
class UserController {
    async getAllOrders(req, res) {
        try {
          if(req.query.id !== undefined) {
            var searchKey = req.query.id 
          } else searchKey = ''
          const orders = await models.Order.findAndCountAll({
            offset: Number(req.query.offset),
            limit: Number(req.query.limit),
            where: {
              id: {
                [Op.like]: '%' + searchKey + '%'
              }
            },
            include: [
              {
                model: models.User,
                as: 'user'
              },
              {
                model: models.Payment,
                as: 'payment'
              },
              {
                model: models.Status,
                as: 'status'
              }
            ]
          })
          if (!orders) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.data = orders
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async getOrderByStatus(req, res) {
      try {
        const orders = await models.Order.findAndCountAll({
          offset: Number(req.query.offset),
          limit: Number(req.query.limit),
          where: {
            statusId: req.params.id
          },
          include: [
            {
              model: models.User,
              as: 'user'
            },
            {
              model: models.Payment,
              as: 'payment'
            },
            {
              model: models.Status,
              as: 'status'
            }
          ]
        })
        if (!orders) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = orders
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
  }

    async getOneOrder(req, res) { 
        try {
            const order = await models.Order.findOne({
              where: {
                id: Number(req.params.id)
              },
              include: [
                  {
                      model: models.Status,
                      as: 'status'
                  },
                  {
                      model: models.User,
                      as: 'user'
                  },
                  {
                    model: models.User,
                    as: 'owner'
                  },
                  {
                    model: models.Payment,
                    as:'payment'
                  }
              ]
            })
            if (!order) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.data = order
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async getMyTransaction(req, res) {
      try {
        const tokenFromHeader = auth.getJwtToken(req)
        const account = jwt.decode(tokenFromHeader)
        var wheretmp = {}
        if(Number(req.params.status) !== 0) {
          wheretmp = {
            userId: Number(account.payload.id),
            statusId: Number(req.params.status)
          }
        } else {
          wheretmp = {
            userId: Number(account.payload.id),
          }
        }
        const orders = await models.Order.findAndCountAll({
          where : wheretmp,
          // offset: Number(req.query.offset),
          // limit: Number(req.query.limit),
          include: [
            {
              model: models.User,
              as: 'user'
            },
            {
              model: models.User,
              as: 'owner'
            },
            {
              model: models.Payment,
              as: 'payment'
            },
            {
              model: models.Status,
              as: 'status'
            }
          ]
        })

        if (!orders) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = orders
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
    }
    }

    async getMyOrder(req, res) {
      try {
        const tokenFromHeader = auth.getJwtToken(req)
        const account = jwt.decode(tokenFromHeader)
        var wheretmp = {}
        if(Number(req.params.status) !== 0) {
          wheretmp = {
            ownerId: Number(account.payload.id),
            statusId: Number(req.params.status)
          }
        } else {
          wheretmp = {
            ownerId: Number(account.payload.id),
          }
        }
        const orders = await models.Order.findAndCountAll({
          where : wheretmp,
          // offset: Number(req.query.offset),
          // limit: Number(req.query.limit),
          include: [
            {
              model: models.User,
              as: 'user'
            },
            {
              model: models.User,
              as: 'owner'
            },
            {
              model: models.Payment,
              as: 'payment'
            },
            {
              model: models.Status,
              as: 'status'
            }
          ]
        })

        if (!orders) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = orders
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
    }
    }

    async getOrdersByUser(req, res) {
        try {
            const orders = await models.Order.findAll({
              where: {
                userId: Number(req.params.id)
              }
            })
    
            if (!orders) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.orders = orders
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async getOrdersByOwner(req, res) {
      try {
          const orders = await models.Order.findAll({
            // where: {
            //   ownerId: Number(req.params.id)
            // }, 
            include: [
              {
                model: models.Orderdetail,
                as: 'orderdetails',
                include: 
                [
                  {
                    model: models.Product,
                    as: 'product'
                  }
                ]
              }
            ]
          })

          // filter orders by owner ==> not done yet
          // orders = orders.filter(order => 
          //   order.orderdetails.filter(orderdetail => 
          //     orderdetail.product.ownerId = Number(req.params.id)
          //   )
          // )

          if (!orders) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.orders = orders
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
      }
    }

    async getOrderAnalyze(req, res) {
      try {
        const tokenFromHeader = auth.getJwtToken(req)
        const account = jwt.decode(tokenFromHeader)
        const order = await models.Order.findAll({
          where: {
            ownerId: Number(account.payload.id) 
          },
          attributes: ['statusId', [sequelize.fn('count', sequelize.col('statusId')), 'number']],
          group : ['statusId'],
        })
        if (!order) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = order
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getSaleAnalyze(req, res) {
      try {
        const tokenFromHeader = auth.getJwtToken(req)
        const account = jwt.decode(tokenFromHeader)
        const day = await models.Order.findAll({
          where: {
            ownerId: Number(account.payload.id),
            statusId: 4,
            createdAt: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date()
            }
          }
        })

        const week = await models.Order.findAll({
          where: {
            ownerId: Number(account.payload.id),
            statusId: 4,
            createdAt: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 7*24 * 60 * 60 * 1000)
            }
          }
        })

        const month = await models.Order.findAll({
          where: {
            ownerId: Number(account.payload.id),
            statusId: 4,
            createdAt: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 30*24 * 60 * 60 * 1000)
            }
          }
        })

        const sum = await models.Order.findAll({
          where: {
            ownerId: Number(account.payload.id),
            statusId: 4
          }
        })
        var sale = {
          day: day,
          week: week,
          month: month,
          sum: sum
        }
        const data = {}
        data.data = sale
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async createOrder(req, res) {
        try {
            const data = req.body
            const newOrder = await models.Order.create(data)
            if (!newOrder) {
              return res.status(400).json('Error')
            }
            return res.status(200).json(newOrder)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async updateOrder(req, res) {
        try {
            const order = await models.Order.findOne({
                where: {
                    id: Number(req.params.id),
                },
            });
            order.statusId = Number(req.body.statusId)
            order.ownerAdd = req.body.ownerAdd
            order.ownerPhone = req.body.ownerPhone
            if (order.save()) {
                return res.status(200).json(order);        
              }
              return res.status(400).json('Error');
            } catch (error) {
              return res.status(400).json(error.message);
        }
    }


}
module.exports = new UserController()