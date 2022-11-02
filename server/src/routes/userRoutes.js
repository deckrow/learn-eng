const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const userMiddleware = require('../middlewares/userMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

// protected routes
router.use(authMiddleware.protect)

router.get('/me', userMiddleware.getMe, userController.getUser)
router.patch('/updateMe', userController.updateMe)
router.patch('/updateMyPassword', authController.updatePassword)
router.delete('/deleteMe', userController.deleteMe)

// restricted routes
router.use(authMiddleware.restrictTo('admin'))

router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser)

router
	.route('/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser)

module.exports = router
