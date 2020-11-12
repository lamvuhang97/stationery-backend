var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const productController = require('../controllers/ProductController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */
// router.get('/profile', auth.isAuthenticated, userController.getProfile)
router.get('/new-arrival', productController.getNewArrival)

router.get('/', productController.getAllProducts)

router.get('/:id', productController.getOneProduct)

router.get('/user/:id', productController.getProductsByOwner)

router.get('/category/:id', productController.getProductsByCategory)

router.post('/', productController.createProduct)

// router.put('/:id', userController.updateUser)

// router.delete('/:id', auth.isAuthenticated, auth.isAdmin, userController.deleteUSer)



module.exports = router;
