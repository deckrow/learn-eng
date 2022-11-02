const AppError = require('../utils/AppError')
const APIFeatures = require('../utils/APIFeatures')
const catchAsync = require('../helpers/catchAsync')

exports.getAll = Model => catchAsync(
	async (req, res) => {
		const searchQuery = req.body.searchQuery || {}
		const feature = new APIFeatures(
			Model.find(searchQuery),
			req.query
		)
			.filter()
			.sort()
			.limitFields()
			.pagination()

		// doc query examination
		// const docs = await feature.mongoQuery.explain()
		const docs = await feature.mongoQuery

		res
			.status(200)
			.json({
				status: 'success',
				results: docs.length,
				data: {
					docs
				}
			})
	}
)

exports.getOne = Model => catchAsync(
	async (req, res, next) => {
		const { id } = req.params
		const doc = await Model.findById(id)

		if (!doc) {
			return next(
				new AppError(`No document found with ID ${id}`)
			)
		}

		res
			.status(200)
			.json({
				status: 'success',
				data: {
					doc
				}
			})
	}
)

exports.createOne = Model => catchAsync(
	async (req, res) => {
		const doc = await Model.create(req.body)

		// TODO change doc to real name
		res
			.status(201)
			.json({
				status: 'success',
				data: {
					doc
				}
			})
	}
)

exports.updateOne = Model => catchAsync(
	async (req, res, next) => {
		const { id } = req.params
		const doc = await Model.findByIdAndUpdate(
			id,
			req.body,
			{
				// return new document
				new: true,

				// run validators after update
				runValidators: true
			}
		)

		if (!doc) {
			return next(
				new AppError(`No document found with ID ${id}`, 404)
			)
		}

		// TODO change doc to real name
		res
			.status(200)
			.json({
				status: 'success',
				data: {
					doc
				}
			})
	}
)

exports.deleteOne = Model => catchAsync(
	async (req, res, next) => {
		const { id } = req.params
		const doc = await Model.findByIdAndDelete(id)

		if (!doc) {
			return next(
				new AppError(`No document found with ID ${id}`, 404)
			)
		}

		res
			.status(204)
			.json({
				status: 'success',
				data: null
			})
	}
)
