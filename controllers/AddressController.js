const paypal = require('@paypal/payouts-sdk');
const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
const product = require('../models/product');
class AddressController {
    async getAddress(req, res) {
      try {
        const address = await models.Address.findAll({
            where: {
                id: Number(req.params.id)
            },
            include: [
              {
                model: models.Province,
                as: 'province'
              },
              {
                model: models.District,
                as: 'district'
              }
            ]
        })
        if (!address) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = address
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async postAddress(req, res) {
        try {
            const data = req.body
            const newAddress= await models.Address.create(data)
            if (!newAddress) {
              return res.status(400).json('Error')
            }
            return res.status(200).json(newAddress)
        } catch (error) {
        return res.status(400).json(error.message)
        }
    }

    async getAddressByUser(req, res) {
        try {
            const address = await models.Address.findAll({
                where: {
                    userId: Number(req.params.userId)
                },
                include: [
                  {
                    model: models.Province,
                    as: 'province'
                  },
                  {
                    model: models.District,
                    as: 'district'
                  }
                ]
            })
            if (!address) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.data = address
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
          }
    }

    async getMyAddress(req, res) {
        try {
            const tokenFromHeader = auth.getJwtToken(req)
            const account = jwt.decode(tokenFromHeader)
            const address = await models.Address.findAll({
              where: {
                  userId: Number(account.payload.id)
              },
              include: [
                {
                  model: models.Province,
                  as: 'province'
                },
                {
                  model: models.District,
                  as: 'district'
                }
              ]
            })
            if (!address) {
              return res.status(200).json('Not found')
            }
            const data = {}
            data.data = address
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
          }
    }

    async getProvince(req, res) {
      try {
        const province= await models.Province.findAll()
        if (!province) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = province
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }

    async getDistrictByProvince(req, res) {
      try {
        const district= await models.District.findAll({
          where: {
            provinceId: Number(req.params.provinceId)
          }
        })
        if (!district) {
          return res.status(200).json('Not found')
        }
        const data = {}
        data.data = district
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json(error.message)
      }
    }
}
module.exports = new AddressController()