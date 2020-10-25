const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
const product = require('../models/product');
class CartController {
    async getAllCarts(req, res) {
        try {
          const carts = await models.Cart.findAll()
          if (!carts) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.carts = carts
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async getOneCart(req, res) {
        try {
          const cart = await models.Cart.findOne({
              where: {
                  id: Number(req.params.id)
              },
              include: [
                  {
                      model: models.User,
                      as: 'user' 
                  },
                  {
                      model: models.Product,
                      as: 'product'
                  }
              ]
          })
          if (!cart) {
            return res.status(200).json('Not found')
          }
          const data = {}
          cart.dataValues.user = cart.user.username
          cart.dataValues.product = cart.product.name
          data.cart = cart
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async getCartsByUser(req, res) {
        try {
          const carts = await models.Cart.findAll({
              where: {
                  userId: Number(req.params.id)
              }
          })
          if (!carts) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.carts = carts
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

}
module.exports = new CartController()