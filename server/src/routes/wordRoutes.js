const express = require('express')
const wordController = require('../controllers/wordController')
const wordMiddleware = require('../middlewares/wordMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authMiddleware.protect)
// router.use(authMiddleware.restrictTo('user'))

router
	.route('/')
	.get(wordMiddleware.setSearchQuery, wordController.getAllWords)
	.post(wordMiddleware.setUserId, wordController.createWord)

router
	.route('/:id')
	.get(wordController.getWord)
	.patch(wordController.updateWord)
	.delete(wordController.deleteWord)

module.exports = router
