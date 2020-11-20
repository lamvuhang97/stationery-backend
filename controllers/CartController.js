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
          data.data = cart
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async getMyCart(req, res) {
      try {
        const tokenFromHeader = auth.getJwtToken(req)
        const account = jwt.decode(tokenFromHeader)
        const carts = await models.Cart.findAll({
            where: {
                userId: Number(account.payload.id)
            },
            include: [
              {
                  model: models.Product,
                  as: 'product',
                  include: [
                    {
                      model: models.User,
                      as: 'owner'
                    },
                    {
                      model: models.Productimage,
                      as: 'images',
                      include: [{
                        model: models.Image,
                        as: 'url'
                      }]
                    }
                  ]
              }
            ]
        })
        if (!carts) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = carts
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
          if (!carts) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.data = carts
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async createCart(req, res) {  // check if exits => not done yet
      try {
        const tokenFromHeader = auth.getJwtToken(req)
        const account = jwt.decode(tokenFromHeader)
        const data = req.body
        const cart = await models.Cart.findOne({
          where: {
            userId: account.payload.id,
            productId: req.body.productId
          }
        })
        if(cart) {
          cart.userId = account.payload.id
          cart.productAmount = Number(cart.productAmount) + Number(req.body.productAmount) 
          if (cart.save()) {
            return res.status(200).json(cart);        
          }
          return res.status(400).json('Error');
        }
        data.userId = account.payload.id
        const newCart = await models.Cart.create(data)
        if (!newCart) {
          return res.status(400).json('Error')
        }
        return res.status(200).json(newCart)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async updateCart(req, res) {
      try {
        const cart = await models.Cart.findOne({
          where: {
            id: Number(req.params.id),
          },
        });
        cart.productAmount = req.body.productAmount;
        if (cart.save()) {
          return res.status(200).json(cart);        
        }
        return res.status(400).json('Error');
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }


}
module.exports = new CartController()