var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const orderController = require('../controllers/OrderController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */

router.get('/', orderController.getAllOrders)

router.get('/my-order/:status', orderController.getMyOrders)

router.get('/:id', orderController.getOneOrder)

router.get('/user/:id', orderController.getOrdersByUser)

router.get('/owner/:id', orderController.getOrdersByOwner)

router.post('/', orderController.createOrder)

router.put('/:id', orderController.updateOrderStatus)

// router.delete('/:id', auth.isAuthenticated, auth.isAdmin, orderController.deleteUser)



module.exports = router;
