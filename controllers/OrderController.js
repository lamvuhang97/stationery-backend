const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
class UserController {
    async getAllOrders(req, res) {
        try {
            const orders = await models.Order.findAll()
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

    }

    async createOder(req, res) {
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