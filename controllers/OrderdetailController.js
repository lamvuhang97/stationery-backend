const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
const product = require('../models/product');
class OrderdetailController {
    async getAllOrderdetails(req, res) {
        try {
            const orderdetails = await models.Orderdetail.findAll()
            if (!orderdetails) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.orderdetails = orderdetails
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async getOneOrderdetail(req, res) {
        try {
            const orderdetail = await models.Orderdetail.findOne(
                {
                    where: {
                        id: Number(req.params.id)
                    }
                }
            )
            if (!orderdetail) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.orderdetail = orderdetail
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async getOrderdetailsByOrder(req, res) {
        try {
            const orderdetails = await models.Orderdetail.findAll(
                {
                    where: {
                        orderId: Number(req.params.id)
                    },
                    include: [
                        {
                            model: models.Product,
                            as:'product'
                        }
                    ]
                }
            )
            if (!orderdetails) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.data = orderdetails
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async updateIsReview(req, res) {
        try {
            const order = await models.Orderdetail.findOne({
                where: {
                    id: Number(req.params.id),
                },
            });
            order.isReview = Number(req.body.status)
            if (order.save()) {
                return res.status(200).json(order);        
              }
              return res.status(400).json('Error');
            } catch (error) {
              return res.status(400).json(error.message);
        }
    }

    async createOrderdetail(req, res) {
        try {
            const data = req.body
            const newOrderdetail = await models.Orderdetail.create(data)
            if (!newOrderdetail) {
              return res.status(400).json('Error')
            }
            return res.status(200).json(newOrderdetail)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

}
module.exports = new OrderdetailController()