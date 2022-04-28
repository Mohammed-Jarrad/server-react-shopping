const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {authRequest} = require('../Middleware/authMiddleware');

// without auth requests
router.post('/signup', userController.signup); // done
router.post('/login', userController.login); // done
router.get('/logout', userController.logout); // done
//with auth requests
router.get('/users', authRequest, userController.getUsers); // done
router.put('/user', authRequest, userController.updateUser); // done
router.put('/user/reset/password', authRequest, userController.changePassword); // done
router.post('/user/compare/password', authRequest, userController.comparePassword);
router.delete('/user', authRequest, userController.deleteAccount); // done
router.delete('/user/:id', authRequest, userController.removeUser); // done
router.get('/user', authRequest, userController.findUser); // done

module.exports = router;
