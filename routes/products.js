var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const productController = require('../controllers/ProductController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */
// router.get('/profile', auth.isAuthenticated, userController.getProfile)
router.get('/new-arrival', productController.getNewArrival)

router.get('/best-seller', productController.getBestSeller)

router.get('/group-id/:ids', productController.getProductByGroupIds)

router.get('/my-product', productController.getMyProducts)

router.get('/search', productController.searchProduct)

router.get('/my-product/analyze', productController.getProductAnalyze)

router.get('/analyze', productController.getAllProductAnalyze)

router.get('/rate/:id', productController.getRateProduct)

router.get('/', productController.getAllProducts)

router.get('/:id', productController.getOneProduct)

router.get('/user/:id/best-seller', productController.getBestSellerProductsByOwner)

router.get('/user/:id', productController.getProductsByOwner)

router.get('/category/:id', productController.getProductsByCategory)

router.post('/', productController.createProduct)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)



module.exports = router;
