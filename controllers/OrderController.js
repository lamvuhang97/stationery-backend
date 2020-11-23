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
                  }
              ]
            })
            if (!order) {
              return res.status(200).json('Not found')
            }
            const data = {}
            //order.dataValues.status = order.status.name // ddeer get role truc tiep bang user.role, khoong can user.role.name
            order.dataValues.user = order.user.username 
            data.order = order
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async getMyOrders(req, res) {
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

    async updateOrderStatus(req, res) {
        try {
            const order = await models.Order.findOne({
                where: {
                    id: Number(req.params.id),
                },
            });
            order.statusId = Number(req.body.id)
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