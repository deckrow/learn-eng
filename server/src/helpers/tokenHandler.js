const jwt = require('jsonwebtoken')
const util = require('util')
const crypto = require('crypto')

exports.sign = id => jwt.sign(
	// payload
	{ id },

	// secret
	process.env.JWT_SECRET,

	// options
	{ expiresIn: process.env.JWT_EXPIRES_IN }
)

exports.verify = token => util.promisify(
	jwt.verify
)(
	token,
	process.env.JWT_SECRET
)

exports.hash = token => crypto
	.createHash('sha256')
	.update(token)
	.digest('hex')
