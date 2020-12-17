const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
var sequelize = require('sequelize')
const Op = sequelize.Op;
class HistoryController {
    async getHistoryByOrder(req, res) {
        try {
          const history = await models.History.findAll({
            where: {
                orderId: req.params.id
            },
            include: [
              {
                model: models.Status,
                as: 'status'
              }
            ]
          })
          if (!history) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.data = history
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async createHistory(req, res) {
        try {
          const data = req.body
          const newHistory = await models.History.create(data)
          if (!newHistory) {
            return res.status(400).json('Error')
          }
          return res.status(200).json(newHistory)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

}
module.exports = new HistoryController()