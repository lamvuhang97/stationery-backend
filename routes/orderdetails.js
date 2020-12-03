var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const orderdetailController = require('../controllers/OrderdetailController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */

router.get('/', orderdetailController.getAllOrderdetails)

router.get('/:id', orderdetailController.getOneOrderdetail)

router.get('/order/:id', orderdetailController.getOrderdetailsByOrder)

router.post('/', orderdetailController.createOrderdetail)

router.put('/:id', orderdetailController.updateIsReview)

module.exports = router;
