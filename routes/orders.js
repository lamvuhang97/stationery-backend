var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const orderController = require('../controllers/OrderController')

/* GET users listing. */

router.get('/', orderController.getAllOrders)

router.get('/:id', orderController.getOneOrder)

router.get('/user/:id', orderController.getOrdersByUser)

router.get('/owner/:id', orderController.getOrdersByOwner)

router.post('/', orderController.createOrder)

router.put('/:id', orderController.updateOrderStatus)

// router.delete('/:id', auth.isAuthenticated, auth.isAdmin, orderController.deleteUser)



module.exports = router;
