var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const productController = require('../controllers/ProductController')

/* GET users listing. */
// router.get('/profile', auth.isAuthenticated, userController.getProfile)

router.get('/', productController.getAllProducts)

router.get('/:id', productController.getOneProduct)

router.get('/user/:id', productController.getProductsByOwner)

router.get('/category/:id', productController.getProductsByCategory)

router.post('/', productController.createProduct)

// router.put('/:id', userController.updateUser)

// router.delete('/:id', auth.isAuthenticated, auth.isAdmin, userController.deleteUSer)



module.exports = router;
