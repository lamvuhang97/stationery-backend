var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const cartController = require('../controllers/CartController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */
router.get('/mycart', cartController.getMyCart)

router.get('/', cartController.getAllCarts)

router.get('/:id', cartController.getOneCart)

router.get('/user/:id', cartController.getCartsByUser)

router .post('/', cartController.createCart)

router.put('/:id', cartController.updateCart)

module.exports = router;
