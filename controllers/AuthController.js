const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const models = require('../models')
const config = require('../config/app')
const { Op } = require("sequelize");
class AuthController {
    async login(req, res) {
		try {
			const options = {
                where: {
                    username: req.body.username,
                    roleId: 2,
                    status: true
				},
			};
			const user = await models.User.findOne(options)
			if (!user) {
				return res.status(400).json("username not exit")
			}
			let isCorrect = false;
			console.log(req.body.password);
			console.log(user.password);
			await bcrypt
				.compare(req.body.password, user.password)
				.then((result) => {
					isCorrect = result;
				});
			if (!isCorrect) {
				return res.status(400).json("incorrect password")
			}
			const payload = _.omit(user.dataValues, ['password', 'createdAt', 'updatedAt']);
			const token = jwt.sign({ payload }, config.auth.jwt_secret, {
				expiresIn: config.auth.jwt_expires_in,
				algorithm: 'HS512',
			});
			const refreshToken = jwt.sign(
				{ payload },
				config.auth.refresh_token_secret,
				{
					expiresIn: config.auth.refresh_token_expires_in,
					algorithm: 'HS512',
				},
			);
			const dataResponse = {
				token,
				refreshToken,
			};
			//tokenList[refreshToken] = dataResponse;
			return res.status(200).json(dataResponse);
		} catch (error) {
			return res.status(400).json(error.message)
		}
	}

	async loginAdmin(req, res) {
		try {
			const options = {
                where: {
                    username: req.body.username,
                    roleId: {
						[Op.in] : [1,3]
					},
                    status: true
				},
			};
			const user = await models.User.findOne(options)
			if (!user) {
				return res.status(400).json("username not exit")
			}
			let isCorrect = false;
			await bcrypt
				.compare(req.body.password, user.password)
				.then((result) => {
					isCorrect = result;
				});
			if (!isCorrect) {
				return res.status(400).json("incorrect password")
			}
			const payload = _.omit(user.dataValues, ['password', 'createdAt', 'updatedAt']);
			const token = jwt.sign({ payload }, config.auth.jwt_secret, {
				expiresIn: config.auth.jwt_expires_in,
				algorithm: 'HS512',
			});
			const refreshToken = jwt.sign(
				{ payload },
				config.auth.refresh_token_secret,
				{
					expiresIn: config.auth.refresh_token_expires_in,
					algorithm: 'HS512',
				},
			);
			const dataResponse = {
				token,
				refreshToken,
			};
			//tokenList[refreshToken] = dataResponse;
			return res.status(200).json(dataResponse);
		} catch (error) {
			return res.status(400).json(error.message)
		}
	}
}
module.exports = new AuthController()