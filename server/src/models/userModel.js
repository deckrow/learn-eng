const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const tokenHandler = require('../helpers/tokenHandler')

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please tell us your name']

			// to change val on res
			// set: val => Math.round(val)
		},

		email: {
			type: String,
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
			required: [true, 'Please provide your email']
		},

		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user'
		},

		active: {
			type: Boolean,
			default: true,
			select: false
		},

		password: {
			type: String,
			required: [true, 'Please provide a password'],
			minlength: 8,
			select: false
		},

		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password'],
			validate: {
				// works only when create or save!
				validator(val) {
					return val === this.password
				},
				message: 'Passwords are not the same'
			}
		},

		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date
	}
)

userSchema.pre(
	'save',
	async function (next) {
		// only run this function if password was actually modified
		if (!this.isModified('password'))
			return next()

		// hash the password with cost 12
		this.password = await bcrypt.hash(this.password, 12)

		// delete passwordConfirm field
		this.passwordConfirm = undefined

		next()
	}
)

userSchema.pre(
	'save',
	function (next) {
		if (!this.isModified('password') || this.isNew)
			return next()

		// run this 1sec before token was created
		this.passwordChangedAt = Date.now() - 1000

		next()
	}
)

userSchema.pre(
	/^find/,
	function (next) {
		this.find({ active: { $ne: false } })

		next()
	}
)

userSchema.methods.correctPassword = (
	candidatePassword,
	userPassword
) => bcrypt.compare(candidatePassword, userPassword)

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
	if (!this.passwordChangedAt)
		return false

	const changedTimestamp = parseInt(
		this.passwordChangedAt.getTime() / 1000,
		10
	)

	return changedTimestamp < jwtTimestamp
}

userSchema.methods.createPasswordResetToken = function () {
	// create reset token
	const resetToken = crypto.randomBytes(32).toString('hex')

	// save hashed token in db
	this.passwordResetToken = tokenHandler.hash(resetToken)
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000

	// send this token to the user
	return resetToken
}

module.exports = mongoose.model('User', userSchema)
