var express = require('express')
var router = express.Router()

const authController = require('../controllers/AuthController')

/* GET users listing. */

router.post('/login', authController.login)

router.post('/admin/login', authController.loginAdmin)

module.exports = router
