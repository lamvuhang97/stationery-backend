var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const userController = require('../controllers/UserController')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
/* GET users listing. */
router.get('/profile', auth.isAuthenticated, userController.getProfile)

router.put('/profile', auth.isAuthenticated, userController.updateProfile)

router.get('/search', userController.searchUser)

router.get('/', userController.getAllUsers)

router.get('/:id', userController.getOneUser)

router.post('/', userController.createUser)

router.put('/wallet/:id', userController.updateWallet)

router.put('/:id', userController.updateUser)

router.delete('/:id', auth.isAuthenticated, auth.isAdmin, userController.deleteUser)



module.exports = router;
