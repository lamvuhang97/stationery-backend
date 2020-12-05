var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const addressController = require('../controllers/AddressController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */


router.get('/user/:userId', addressController.getAddressByUser)

router.get('/my-address', addressController.getMyAddress)

router.post('/', addressController.postAddress)

router.get('/province', addressController.getProvince)

router.get('/district/:provinceId', addressController.getDistrictByProvince)

router.get('/:id', addressController.getAddress)

module.exports = router;
