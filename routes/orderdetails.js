var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const orderdetailController = require('../controllers/OrderdetailController')

/* GET users listing. */

router.get('/', orderdetailController.getAllOrderdetails)

router.get('/:id', orderdetailController.getOneOrderdetail)

router.get('/order/:id', orderdetailController.getOrderdetailsByOrder)

router.post('/', orderdetailController.createOrderdetail)

module.exports = router;
