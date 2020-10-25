var express = require('express');
var router = express.Router();
const auth = require('../utils/auth')

const userController = require('../controllers/UserController')

/* GET users listing. */
router.get('/profile', auth.isAuthenticated, userController.getProfile)

router.get('/', userController.getAllUsers)

router.get('/:id', userController.getOneUser)

router.post('/', userController.createUser)

router.put('/:id', userController.updateUser)

router.delete('/:id', auth.isAuthenticated, auth.isAdmin, userController.deleteUser)



module.exports = router;
