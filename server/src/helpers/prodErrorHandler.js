const AppError = require('../utils/AppError')

module.exports = err => {
	let message

	switch (err.name) {
	case 'JsonWebTokenError':
		message = 'Invalid token. Please log in again.'
		break
	case 'TokenExpiredError':
		message = 'Your token has expired! Please log in again.'
		break
	case 'CastError':
		message = `Invalid ${err.path}: ${err.value}.`
		break
	case 'ValidationError':
		message = validationError(err)
		break
	case 'MongoError':
		message = duplicateFieldsError(err)
		break

	default:
		return err
	}

	return new AppError(message, 400)
}

// error handlers
const validationError = err => {
	const errors = Object.values(err.errors).map(el => el.message)

	return `Invalid input data. ${errors.join('. ')}`
}

const duplicateFieldsError = err => {
	const key = Object.keys(err.keyValue)[0]
	const value = err.keyValue[key]

	return `Duplicate field value "${value}". Please use another one.`
}
