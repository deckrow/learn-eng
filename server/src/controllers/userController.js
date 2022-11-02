const User = require('../models/userModel')
const AppError = require('../utils/AppError')
const factory = require('./factoryController')
const catchAsync = require('../helpers/catchAsync')

// factories
exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User)
exports.createUser = factory.createOne(User)
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)

// other controllers
exports.updateMe = catchAsync(
	async (req, res, next) => {
		if (req.body.password || req.body.passwordConfirm) {
			return next(
				new AppError(
					'This route is not for password updates. Please use /updateMyPassword',
					400
				)
			)
		}

		const permittedFields = ['name', 'email']
		const filteredBody = {}

		Object
			.entries(req.body)
			.forEach(
				([key, value]) => {
					if (permittedFields.includes(key))
						filteredBody[key] = value
				}
			)

		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			filteredBody,
			{
				new: true,
				runValidators: true
			}
		)

		res
			.status(200)
			.json({
				status: 'success',
				data: {
					user: updatedUser
				}
			})
	}
)

exports.deleteMe = catchAsync(
	async (req, res) => {
		await User.findByIdAndUpdate(req.user.id, { active: false })

		res
			.status(204)
			.json({
				status: 'success',
				data: null
			})
	}
)
