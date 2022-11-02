const User = require('../models/userModel')
const AppError = require('../utils/AppError')
const catchAsync = require('../helpers/catchAsync')
const tokenHandler = require('../helpers/tokenHandler')

exports.protect = catchAsync(
	async (req, res, next) => {
		const { authorization } = req.headers
		let token

		if (authorization && authorization.startsWith('Bearer'))
			token = authorization.split(' ')[1]

		if (!token) {
			return next(
				new AppError(
					'You are not logged in! Please log in to get access.',
					401
				)
			)
		}

		const decoded = await tokenHandler.verify(token)
		const currentUser = await User.findById(decoded.id)

		if (!currentUser) {
			return next(
				new AppError(
					'The user belonging to this token does not exist.',
					401
				)
			)
		}

		const isChangedAfter = currentUser.changedPasswordAfter(decoded.iat)

		if (isChangedAfter) {
			return next(
				new AppError(
					'User recently changed password! Please log in again.',
					401
				)
			)
		}

		req.user = currentUser
		next()
	}
)

exports.restrictTo = (...roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return next(
			new AppError(
				'You do not have permission to perform this action',
				403
			)
		)
	}

	next()
}
