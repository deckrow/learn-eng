class AppError extends Error {
	constructor(message, statusCode) {
		super(message)

		this.statusCode = statusCode
		this.status = this.statusType()
		this.isOperational = true

		// exclude this class from stack trace
		Error.captureStackTrace(this, this.constructor)
	}

	statusType() {
		if (this.statusCode.toString().startsWith('4'))
			return 'fail'

		return 'error'
	}
}

module.exports = AppError
