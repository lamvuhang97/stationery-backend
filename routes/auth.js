var express = require('express')
var router = express.Router()

const authController = require('../controllers/AuthController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/* GET users listing. */

router.post('/login', authController.login)

router.post('/admin/login', authController.loginAdmin)

module.exports = router
