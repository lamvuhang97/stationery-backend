const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
var sequelize = require('sequelize')
const Op = sequelize.Op;
class CategorysumController {
    async getAllCategorysum(req, res) {
        try {
          if(req.query.name !== undefined) {
            var searchKey = req.query.name 
          } else searchKey = ''
          const categories = await models.Categorysum.findAll({
            // offset: Number(req.query.offset),
            // limit: Number(req.query.limit),
            where: {
              name: {
                [Op.like]: '%' + searchKey + '%'
              }
            },
            include: [
              {
                model: models.Category,
                as: 'categorysub'
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
    async getOneCategorysum(req, res) {
        try {
          const category = await models.Categorysum.findOne({
            where: {
              id: Number(req.params.id)
            },
            include: [
              {
                model: models.Product,
                as: 'products'
              }
            ]
          })
          if (!category) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.category = category
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async createCategorysum(req, res) {
        try {
          const data = req.body
          const newCategory= await models.Categorysum.create(data)
          if (!newCategory) {
            return res.status(400).json('Error')
          }
          return res.status(200).json(newCategory)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async updateCategorysum(req, res) {
      try {
        const category = await models.Categorysum.findOne({
          where: {
            id: Number(req.params.id),
          },
        });
        category.name = req.body.name;
        if (category.save()) {
          return res.status(200).json(category);        
        }
        return res.status(400).json('Error');
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }

    async deleteCategorysum(req, res) {
      try {
        const category = await models.Categorysum.findOne({
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
module.exports = new CategorysumController()