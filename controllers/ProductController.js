const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
class ProductController {
    async getAllProducts(req, res) {
        try {
          const products = await models.Product.findAll()
          if (!products) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.products = products
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async getOneProduct(req, res) {
        try {
          const product = await models.Product.findOne({
            where: {
              id: Number(req.params.id)
            },
            include: [
                {
                    model: models.Category,
                    as: 'category'
                },
                {
                    model: models.User,
                    as: 'owner'
                }
            ]
          })
          if (!product) {
            return res.status(200).json('Not found')
          }
          const data = {}
          product.dataValues.category = product.category.name // ddeer get role truc tiep bang user.role, khoong can user.role.name
          product.dataValues.owner = product.owner.username 
          data.product = product
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async getProductsByOwner(req, res) {
      try {
        const products = await models.Product.findAll({
          where: {
            ownerId: Number(req.params.id)
          }
        })

        if (!products) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.products = products
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getProductsByCategory(req, res) {
      try {
        const products = await models.Product.findAll({
          where: {
            categoryId: Number(req.params.id)
          }
        })

        if (!products) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.products = products
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async createProduct(req, res) {
        try {
          const data = req.body
          const newProduct = await models.Product.create(data)
          if (!newProduct) {
            return res.status(400).json('Error')
          }
          return res.status(200).json(newProduct)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

}
module.exports = new ProductController()