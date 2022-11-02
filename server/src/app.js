const express = require('express')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const morgan = require('morgan')
const hpp = require('hpp')

const AppError = require('./utils/AppError')
const errorController = require('./controllers/errorController')

const userRoutes = require('./routes/userRoutes')
const wordRoutes = require('./routes/wordRoutes')

const app = express()

// logger
if (process.env.NODE_ENV === 'development')
	app.use(morgan('dev'))

// set secure http headers
app.use(helmet())

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))

// serving static files
app.use(express.static(`${__dirname}/public`))

// data sanitization against NoSQL query injections
app.use(mongoSanitize())

// data sanitization against XSS
app.use(xss())

// prevent parameter pollution
app.use(
	hpp({
		// fields that won't pollutes
		whitelist: ['duration']
	})
)

app.use(
	'/api',
	rateLimit({
		// max req limit
		max: 100,

		// one hour window to make these requests
		windowMs: 60 * 60 * 1000,
		message: 'Too many requests from this IP, please try again in an hour'
	})
)

app.use('/api/v1/words', wordRoutes)
app.use('/api/v1/users', userRoutes)

app.all(
	'*',
	(req, res, next) => {
		next(
			new AppError(
				`Can't find ${req.originalUrl} on this server!`,
				404
			)
		)
	}
)

app.use(errorController)

module.exports = app
