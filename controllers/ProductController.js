const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
var sequelize = require('sequelize')
const Op = sequelize.Op;
class ProductController {
    async getAllProducts(req, res) {
        try {
          if(req.query.name !== undefined) {
            var searchKey = req.query.name 
          } else searchKey = ''
          const products = await models.Product.findAndCountAll({
            offset: Number(req.query.offset),
            limit: Number(req.query.limit),
            where: {
              name: {
                [Op.like]: '%' + searchKey + '%'
              }
            },
            include: [
              {
                  model: models.Category,
                  as: 'category'
              },
            ]
          })
          if (!products) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.data = products
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
          })
          if (!product) {
            return res.status(200).json('Not found')
          }
          const data = {}
          product.dataValues.category = product.category.name // ddeer get role truc tiep bang user.role, khoong can user.role.name
          product.dataValues.owner = product.owner.username 
          data.data = product
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async getMyProducts(req, res) {
      try {
        const tokenFromHeader = auth.getJwtToken(req)
        const account = jwt.decode(tokenFromHeader)
        const products = await models.Product.findAndCountAll({
            where: {
                ownerId: Number(account.payload.id)
            },
            offset: Number(req.query.offset),
            limit: Number(req.query.limit),
            include: [
              {
                  model: models.Category,
                  as: 'category'
              },
            ]
        })
        if (!products) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = products
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getProductsByOwner(req, res) {
      try {
        if(req.query.name !== undefined) {
          var searchKey = req.query.name 
        } else searchKey = ''
        const products = await models.Product.findAndCountAll({
          offset: Number(req.query.offset) || 0,
          limit: Number(req.query.limit) || 1000,
          where: {
            ownerId: Number(req.params.id),
            name: {
              [Op.like]: '%' + searchKey + '%'
            }
          },
          include: [
            {
                model: models.Category,
                as: 'category'
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
        })

        if (!products) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = products
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getProductsByCategory(req, res) {
      try {
        if(req.query.name !== undefined) {
          var searchKey = req.query.name 
        } else searchKey = ''
        const products = await models.Product.findAndCountAll({
          offset: Number(req.query.offset),
          limit: Number(req.query.limit),
          where: {
            categoryId: Number(req.params.id),
            name: {
              [Op.like]: '%' + searchKey + '%'
            }
          }
        })

        if (!products) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = products
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getNewArrival(req, res) {
      try {
        const products = await models.Product.findAll({
          order: [
            ['createdAt', 'DESC'],
          ],
          limit: Number(req.query.limit) || 1000,
          include: [
            {
              model: models.Productimage,
              as: 'images',
              include: [{
                model: models.Image,
                as: 'url'
              }]
            }
          ]
        })
        if (!products) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = products
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getBestSeller(req, res) {
      try {
        const products = await models.Orderdetail.findAll({
          attributes: ['productId', [sequelize.fn('sum', sequelize.col('productAmount')), 'total']],
          group : ['Orderdetail.productId'],
          raw: true,
          order: sequelize.literal('total DESC'),
          limit: Number(req.query.limit) || 1000,
        })
        if (!products) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = products
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getBestSellerProductsByOwner(req, res) {
      try {
        const products = await models.Orderdetail.findAll({
          attributes: ['productId', [sequelize.fn('sum', sequelize.col('productAmount')), 'total']],
          group : ['Orderdetail.productId'],
          raw: true,
          order: sequelize.literal('total DESC'),
          // limit: 3,
          include: [
            {
              model: models.Product,
              as: 'product'
            }
          ]
        })

        if (!products) {
          return res.status(200).json('Not found')
        }
        var productsFiltered = products.filter(item => item["product.ownerId"] == Number(req.params.id))
        const data = {}
        console.log(productsFiltered);
        data.data = productsFiltered
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getProductByGroupIds(req, res) {  // not done yet  => chua theo order 
      try {
        var ids = (req.params.ids).split(",")
        const products = await models.Product.findAll({
          where: {
            id : ids
          },
          include: [
            {
              model: models.Productimage,
              as: 'images',
              include: [
                {
                model: models.Image,
                as: 'url'
                }
              ]
            }
          ]
        })
        if (!products) {
          return res.status(200).json('Not found')
        }
        var productsOrdered = []
        for(var i of ids) {
          for(var p of products) {
            if(Number(p.id) == Number(i)) {
              productsOrdered.push(p)
              break
            }
          }
        }
        const data = {}
        data.data = productsOrdered
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async createProduct(req, res) {
        try {
          const tokenFromHeader = auth.getJwtToken(req)
          const account = jwt.decode(tokenFromHeader)
          
          const data = req.body
          data.ownerId = account.payload.id
          
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