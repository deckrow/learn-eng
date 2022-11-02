exports.setSearchQuery = (req, res, next) => {
	req.body.searchQuery = { user: req.user._id }

	next()
}

exports.setUserId = (req, res, next) => {
	if (!req.body.user)
		req.body.user = req.user._id

	next()
}

exports.aliasLastWeakWords = (req, res, next) => {
	req.query.sort = '-date,word'
	req.query.fields = 'word,wordTranslation'

	next()
}
