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

router.get('/status/:id', orderController.getOrderByStatus)

router.get('/my-transaction/:status', orderController.getMyTransaction)

router.get('/my-order/analyze', orderController.getOrderAnalyze)

router.get('/analyze', orderController.getAllOrderAnalyze)

router.get('/my-order/sale-analyze', orderController.getSaleAnalyze)

router.get('/my-order/:status', orderController.getMyOrder)

router.get('/:id', orderController.getOneOrder)

router.get('/user/:id', orderController.getOrdersByUser)

router.get('/owner/:id', orderController.getOrdersByOwner)

router.post('/', orderController.createOrder)

router.put('/status/:id', orderController.updateOrderStatus)

router.put('/:id', orderController.updateOrder)



// router.delete('/:id', auth.isAuthenticated, auth.isAdmin, orderController.deleteUser)



module.exports = router;
