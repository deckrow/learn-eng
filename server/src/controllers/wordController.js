const Word = require('../models/wordModel')
const factory = require('./factoryController')
const catchAsync = require('../helpers/catchAsync')

// factoryies
exports.getAllWords = factory.getAll(Word)
exports.getWord = factory.getOne(Word)
exports.createWord = factory.createOne(Word)
exports.updateWord = factory.updateOne(Word)
exports.deleteWord = factory.deleteOne(Word)

// other controllers
exports.getWordStats = catchAsync(
	async (req, res) => {
		const stats = await Word.aggregate([
			{
				$match: {
					value: { $gte: 10 }
				}
			},

			{
				$group: {
					// could be any value
					// { _id: '$value' }
					_id: null,
					numItems: { $sum: 1 },
					avgValue: { $avg: '$value' },
					minValue: { $min: '$value' },
					maxValue: { $max: '$value' }
				}
			}
		])

		res
			.status(200)
			.json({
				status: 'success',
				data: { stats }
			})
	}
)
