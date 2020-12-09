var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const categoryController = require('../controllers/CategoryController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */
// router.get('/profile', auth.isAuthenticated, userController.getProfile)

router.get('/', categoryController.getAllCategories)

router.get('/:id', categoryController.getOneCategory)  // get one category and product in it

router.post('/', categoryController.createCategory)

router.put('/:id', categoryController.updateCategory) 

router.delete('/:id', categoryController.deleteCategory)



module.exports = router;
