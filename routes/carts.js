var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const cartController = require('../controllers/CartController')

/* GET users listing. */

router.get('/', cartController.getAllCarts)

router.get('/:id', cartController.getOneCart)

router.get('/user/:id', cartController.getCartsByUser)

router .post('/', cartController.createCart)

router.put('/:id', cartController.updateCart)

module.exports = router;
