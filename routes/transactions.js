var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const transactionController = require('../controllers/TransactionController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

router.get('/user/:id', transactionController.getTransactionByUser)

router.get('/my-transaction', transactionController.getMyTransaction)

router.get('/', transactionController.getAllTransaction)

router.get('/:id', transactionController.getOneTransaction)

router.post('/', transactionController.postTransaction)

router.put('/', transactionController.updateTransaction)

module.exports = router;
