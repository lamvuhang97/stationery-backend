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
}
module.exports = new ImageController()