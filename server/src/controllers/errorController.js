const prodErrorHandler = require('../helpers/prodErrorHandler')

// without next prop it won't work correctly
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500
	err.status = err.status || 'error'

	if (process.env.NODE_ENV === 'development')
		return sendDevError(err, res)

	sendProdError(err, res)
}

const sendDevError = (err, res) => {
	res
		.status(err.statusCode)
		.json({
			status: err.status,
			message: err.message,
			'-': '-----',
			err,
			stack: err.stack
		})
}

const sendProdError = (err, res) => {
	const error = prodErrorHandler(err)

	if (error.isOperational) {
		return res
			.status(error.statusCode)
			.json({
				status: error.status,
				message: error.message
			})
	}

	console.error('ERROR', error)

	res
		.status(500)
		.json({
			status: 'error',
			message: 'Something went very wrong!'
		})
}
