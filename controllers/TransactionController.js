const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
const image = require('../models/image');
const roductimage = require('../models/productimage');
class TransactionController {
    async getTransactionByUser(req, res) {
        try {
            const trans = await models.Transaction.findAndCountAll({
              offset: Number(req.query.offset) || 0,
              limit: Number(req.query.limit) || 15,
              where: {
                userId: Number(req.params.id),
              },
              include: [
                {
                    model: models.User,
                    as: 'user'
                },
              ]
            })
    
            if (!trans) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.data = trans
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async getMyTransaction(req, res) {
        try {
            const tokenFromHeader = auth.getJwtToken(req)
            const account = jwt.decode(tokenFromHeader)
            const trans = await models.Transaction.findAndCountAll({
                where: {
                    userId: Number(account.payload.id)
                },
                offset: Number(req.query.offset),
                limit: Number(req.query.limit),
            })
            if (!trans) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.data = trans
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
          }
    }

    async getAllTransaction(req, res) {
        try {
            const trans = await models.Transaction.findAndCountAll({
              offset: Number(req.query.offset),
              limit: Number(req.query.limit),
              include: [
                {
                    model: models.User,
                    as: 'user'
                },
              ]
            })
            if (!trans) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.data = trans
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
          }
    }

    async getOneTransaction(req, res) {
        try {
            const tran = await models.Transaction.findOne({
              where: {
                id: Number(req.params.id)
              },
              include: [
                {
                    model: models.User,
                    as: 'user'
                },
              ]
            })
            if (!tran) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.data = tran
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
          }
    }

    async postTransaction(req, res) {
        try {
            const data = req.body
            
            const newTran = await models.Transaction.create(data)
            if (!newTran) {
              return res.status(400).json('Error')
            }
            return res.status(200).json(newTran)
          } catch (error) {
            return res.status(400).json(error.message)
          }
    }

    async updateTransaction(req, res) {
        try {
            const tran = await models.Transaction.findOne({
              where: {
                id: Number(req.params.id),
              },
            });
            product.status = req.body.status;
            if (tran.save()) {
              return res.status(200).json(tran);        
            }
            return res.status(400).json('Error');
          } catch (error) {
            return res.status(400).json(error.message);
          }
    }
}
module.exports = new TransactionController()