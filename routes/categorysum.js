var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const categorysumController = require('../controllers/CategorysumController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */
// router.get('/profile', auth.isAuthenticated, userController.getProfile)

router.get('/', categorysumController.getAllCategorysum)

router.get('/:id', categorysumController.getOneCategorysum)  // get one category and product in it

router.post('/', categorysumController.createCategorysum)

router.put('/:id', categorysumController.updateCategorysum) 

router.delete('/:id', categorysumController.deleteCategorysum)



module.exports = router;
