const User = require('../models/userModel')
const AppError = require('../utils/AppError')
const sendEmail = require('../utils/mailer')
const catchAsync = require('../helpers/catchAsync')
const createSendToken = require('../helpers/createSendToken')
const tokenHandler = require('../helpers/tokenHandler')

exports.signup = catchAsync(
	async (req, res) => {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm
		})

		createSendToken(newUser, 201, res)
	}
)

exports.login = catchAsync(
	async (req, res, next) => {
		const { email, password } = req.body

		if (!email || !password) {
			return next(
				new AppError(
					'Please provide email and password',
					400
				)
			)
		}

		const user = await User.findOne({ email }).select('+password')
		const isCorrect = await user?.correctPassword(password, user.password)

		if (!user || !isCorrect) {
			return next(
				new AppError(
					'Incorrect email or password',
					401
				)
			)
		}

		createSendToken(user, 200, res)
	}
)

exports.forgotPassword = catchAsync(
	async (req, res, next) => {
		const { email } = req.body
		const user = await User.findOne({ email })

		if (!user) {
			next(
				new AppError(`There is no user with ${email} address.`, 404)
			)
		}

		const resetToken = user.createPasswordResetToken()
		await user.save({ validateBeforeSave: false })

		const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
		const message = `Forgot your password? Submit a PATH request with your new password and passwordConfirm to: ${resetUrl}.\n If you didn't forget your password, please ignore this email!`

		try {
			await sendEmail({
				email: user.email,
				subject: 'Your password reset token (valid for 10 min)',
				message
			})

			res
				.status(200)
				.json({
					status: 'success',
					message: 'Token sent to email!'
				})
		} catch (e) {
			// if there was an error than remove token from db
			user.passwordResetToken = undefined
			user.passwordResetExpires = undefined

			await user.save({ validateBeforeSave: false })

			next(
				new AppError(
					'There was an error sending the email. Try again later!',
					500
				)
			)
		}
	}
)

exports.resetPassword = catchAsync(
	async (req, res, next) => {
		const hashedToken = tokenHandler.hash(req.params.token)
		const user = await User.findOne({
			passwordResetToken: hashedToken,
			passwordResetExpires: { $gt: Date.now() }
		})

		if (!user) {
			return next(
				new AppError('Token is invalid or has expired.', 400)
			)
		}

		user.password = req.body.password
		user.passwordConfirm = req.body.passwordConfirm
		user.passwordResetToken = undefined
		user.passwordResetExpires = undefined

		await user.save()

		createSendToken(user, 200, res)
	}
)

exports.updatePassword = catchAsync(
	async (req, res, next) => {
		const user = await User.findById(req.user.id).select('+password')
		const isPasswordCorrect = await user?.correctPassword(
			req.body.passwordCurrent,
			user.password
		)

		if (!isPasswordCorrect) {
			return next(
				new AppError('Your current password is wrong.', 401)
			)
		}

		user.password = req.body.password
		user.passwordConfirm = req.body.passwordConfirm

		// user.save() because we're working with passwords
		// some model function won't work if we use update method
		await user.save()

		createSendToken(user, 200, res)
	}
)
