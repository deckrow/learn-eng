const tokenHandler = require('./tokenHandler')

module.exports = (user, statusCode, res) => {
	const token = tokenHandler.sign(user._id)
	const expiresIn = process.env.JWT_COOKIE_EXPIRES_IN

	const cookieOptions = {
		// cookie can't be accessed or modified when sending
		httpOnly: true,

		expires: new Date(
			Date.now + expiresIn * 24 * 60 * 60 * 1000
		)
	}

	// use https
	if (process.env.NODE_ENV === 'production')
		cookieOptions.secure = true

	user.password = undefined
	user.active = undefined

	res
		.status(statusCode)
		.cookie('jwt', token, cookieOptions)
		.json({
			status: 'success',
			token,
			data: {
				user
			}
		})
}
