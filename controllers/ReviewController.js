const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
const image = require('../models/image');
const roductimage = require('../models/productimage');
class ReviewController {
    async getReviewByProduct(req, res) {
        try {
          const reviews = await models.Review.findAndCountAll({
            offset: Number(req.query.offset) || 0,
            limit: Number(req.query.limit) || 10,
            where: {
                productId: req.params.productId
            },
            include: [
              {
                  model: models.User,
                  as: 'user'
              },
            ]
          })
          if (!reviews) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.data = reviews
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
  }

  async postReview(req, res) {
    try {
      const data = req.body
      const newReview= await models.Review.create(data)
      if (!newReview) {
        return res.status(400).json('Error')
      }
      return res.status(200).json(newReview)
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}
module.exports = new ReviewController()