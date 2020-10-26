const _ = require('lodash')
const models = require('../models')
const config = require('../config/app')
const bcrypt = require('bcrypt');
const auth = require('../utils/auth')
const jwt = require('jsonwebtoken');
class UserController {
    async getProfile(req, res) {
      try {
        const tokenFromHeader = auth.getJwtToken(req)
        const account = jwt.decode(tokenFromHeader)
        const user = await models.User.findOne({
          where: { id: Number(account.payload.id), status: true},
          include: [
            {
              model: models.Role, 
              as:'role'
            }
          ]
        });

        if(!user) {
          return res.status(200).json('Not found')
        }

        return res.status(200).json(user);
      } catch(error) {
        return res.status(400).json(error.message)
      }
    }

    async getAllUsers(req, res) {
        try {
          const users = await models.User.findAll(
            {
              where: {
                roleId: 2
              }
            }
          )
          if (!users) {
            return res.status(200).json('Not found')
          }
          const data = {}
          data.users = users
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async getOneUser(req, res) {
        try {
          const user = await models.User.findOne({
            where: {
              id: Number(req.params.id)
            },
            include: [
              {
                model: models.Role,
                as: 'role'
              }
            ]
          })
          if (!user) {
            return res.status(200).json('Not found')
          }
          const data = {}
          user.dataValues.role = user.role.name 
          data.user = user
          return res.status(200).json(data)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async createUser(req, res) {
        try {
          // TODO: check user name unique
          const user = await models.User.findOne({
            where: {
              username: req.body.username
            }
          })
          if(user) {
            return res.status(400).json('Duplicate username')
          }
          const data = req.body
          data.password = bcrypt.hashSync(data.password, config.auth.saltRounds);
          data.roleId = 2
          const newUser = await models.User.create(data)
          if (!newUser) {
            return res.status(400).json('Error')
          }
          return res.status(200).json(newUser)
        } catch (error) {
          return res.status(400).json(error.message)
        }
    }

    async updateUser(req, res) {
      try {
        const user = await models.User.findOne({
          where: {
            id: Number(req.params.id),
          },
        });
        user.email = req.body.email;
        user.phonenumber = req.body.phonenumber;
        user.address = req.body.address;
        if (user.save()) {
          return res.status(200).json(user);        
        }
        return res.status(400).json('Error');
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }

    async deleteUser(req, res) {
      try {
        const user = await models.User.findOne({
          where: {
            id: Number(req.params.id),
          },
        });
        user.status = false
        if (user.save()) {
          return res.status(200).json(user);        
        }
        return res.status(400).json('Error');
      } catch (error) {
        return res.status(400).json(error.message);
      }
    }

}
module.exports = new UserController()