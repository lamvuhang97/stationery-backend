var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const categoryController = require('../controllers/CategoryController')

/* GET users listing. */
// router.get('/profile', auth.isAuthenticated, userController.getProfile)

router.get('/', categoryController.getAllCategories)

router.get('/:id', categoryController.getOneCategory)  // get one category and product in it

router.post('/', categoryController.createCategory)

router.put('/:id', categoryController.updateCategory) 

router.delete('/:id', categoryController.deleteCategory)



module.exports = router;
