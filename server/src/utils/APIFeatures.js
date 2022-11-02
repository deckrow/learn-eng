class APIFeatures {
	constructor(mongoQuery, queryObj) {
		this.mongoQuery = mongoQuery
		this.queryObj = queryObj
	}

	filter() {
		const queryObjCopy = { ...this.queryObj }
		const excludedFields = ['page', 'limit', 'sort', 'fields']

		excludedFields.forEach(
			field => delete queryObjCopy[field]
		)

		const resultQuery = JSON
			.stringify(queryObjCopy)
			.replace(
				/\b(gte|gt|lte|lt)\b/g,
				match => `$${match}`
			)

		this.mongoQuery = this.mongoQuery.find(
			JSON.parse(resultQuery)
		)

		return this
	}

	sort() {
		const sort = this.queryObj.sort || 'createdAt'
		const sortBy = sort.split(',').join(' ')

		this.mongoQuery = this.mongoQuery.sort(sortBy)

		return this
	}

	limitFields() {
		const fields = this.queryObj.fields || '-__v'
		const selectedFields = fields.split(',').join(' ')

		this.mongoQuery = this.mongoQuery.select(selectedFields)

		return this
	}

	pagination() {
		const page = this.queryObj.page * 1 || 1
		const limit = this.queryObj.limit * 1 || 200
		const skip = (page - 1) * limit

		this.mongoQuery = this.mongoQuery.skip(skip).limit(limit)

		return this
	}
}

module.exports = APIFeatures
