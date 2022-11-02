exports.uncaughtException = () => process.on(
	'uncaughtException',
	err => {
		console.log('UNCAUGHT EXCEPTION! Shutting down...')
		console.log(err.name, err.message)

		process.exit(1)
	}
)

exports.unhandledRejection = server => process.on(
	'unhandledRejection',
	err => {
		console.log('UNHANDLED REJECTION! Shutting down...')
		console.log(err.name, err.message)

		server.close(() => process.exit(1))
	}
)
