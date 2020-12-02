const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
const image = require('../models/image');
const roductimage = require('../models/productimage');
class ImageController {
    async postImageUrl(req, res) { 
        try {
            const data = req.body
            
            const newImg = await models.Image.create(data)
            if (!newImg) {
            return res.status(400).json('Error')
            }
            return res.status(200).json(newImg)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async postProductImage(req, res) { 
        try {
            const data = req.body
            
            const newProductImg = await models.Productimage.create(data)
            if (!newProductImg) {
            return res.status(400).json('Error')
            }
            return res.status(200).json(newProductImg)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async deleteProductImage(req, res) {
      try {
        const productimage = await models.Productimage.destroy({
          where: {
            imageId : Number(req.params.imageId),
          },
        });
        
        if (productimage) {
          return res.status(200).json(productimage);        
        }
        return res.status(400).json('Error');
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }

    async getImageByProduct(req, res) {
        try {
            const images = await models.Productimage.findAll({
              where: {
                productId: Number(req.params.productId),
              },
              include: [
                  {
                    model: models.Image,
                    as: 'url'
                  }
              ]
            })
    
            if (!images) {
              return res.status(200).json('Not found')
            }
            // images.dataValues.url = images.url.url
            const data = {}
            data.data = images
            return res.status(200).json(data)
          } catch (error) {
            return res.status(400).json(error.message)
        }
    }
}
module.exports = new ImageController()