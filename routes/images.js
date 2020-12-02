var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const imageController = require('../controllers/ImageController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

router.post('/product-image', imageController.postProductImage)

router.post('/', imageController.postImageUrl)

router.delete('/:imageId', imageController.deleteProductImage)

router.get('/product/:productId', imageController.getImageByProduct)



module.exports = router;
