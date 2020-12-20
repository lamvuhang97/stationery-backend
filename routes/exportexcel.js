var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const exportexcelController = require('../controllers/ExportexcelController')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

/* GET users listing. */
// router.get('/profile', auth.isAuthenticated, userController.getProfile)


router.get('/product/:userId', exportexcelController.getExportProduct)  




module.exports = router;
