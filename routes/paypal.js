var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const paypalController = require('../controllers/PaypalController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */


router.post('/payout', paypalController.payout)

module.exports = router;
