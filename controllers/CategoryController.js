const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
var sequelize = require('sequelize')
const Op = sequelize.Op;
class CategoryController {
    async getAllCategories(req, res) {
        try {
          if(req.query.name !== undefined) {
            var searchKey = req.query.name 
          } else searchKey = ''
          const categories = await models.Category.findAndCountAll({
            offset: Number(req.query.offset),
            limit: Number(req.query.limit),
            where: {
              name: {
                [Op.like]: '%' + searchKey + '%'
              }
            },
            include: [
              {
                model: models.Product,
                as: 'products'
              },
              {
                model: models.Categorysum,
                as: 'categorysum' 
              }
            ]
          })
          if (!categories) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.data = categories
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    // chuwa cos association
    async getOneCategory(req, res) {
        try {
          const category = await models.Category.findOne({
            where: {
              id: Number(req.params.id)
            },
            include: [
              {
                model: models.Product,
                as: 'products'
              },
              {
                model: models.Categorysum,
                as: 'categorysum'
              }
            ]
          })
          if (!category) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.data = category
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async createCategory(req, res) {
        try {
          const data = req.body
          const newCategory= await models.Category.create(data)
          if (!newCategory) {
            return res.status(400).json('Error')
          }
          return res.status(200).json(newCategory)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async updateCategory(req, res) {
      try {
        const category = await models.Category.findOne({
          where: {
            id: Number(req.params.id),
          },
        });
        category.name = req.body.name;
        category.categorysumId = req.body.categorysumId
        if (category.save()) {
          return res.status(200).json(category);        
        }
        return res.status(400).json('Error');
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }

    async deleteCategory(req, res) {
      try {
        const category = await models.Category.findOne({
          where: {
            id: Number(req.params.id),
          },
        });
        category.status = false
        if (category.save()) {
          return res.status(200).json(category);        
        }
        return res.status(400).json('Error');
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }


}
module.exports = new CategoryController()