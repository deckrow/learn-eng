const mongoose = require('mongoose')

// messages
const requiredMessage = 'Please enter a word that you wanna translate'
const maxLengthMessage = 'Word or sentence must have less or equal then 50 characters'

const wordSchema = new mongoose.Schema(
	{
		word: {
			type: String,
			trim: true,
			required: [true, `${requiredMessage} from`],
			maxlength: [50, maxLengthMessage]
		},

		wordTranslation: {
			type: String,
			trim: true,
			required: [true, `${requiredMessage} into`],
			maxlength: [50, maxLengthMessage]
		},

		createdAt: {
			type: Date,
			default: new Date(),
			// select: false
		},

		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		// enable virtuals to be part of the output
		// some new fields from middleware
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

wordSchema.index({ user: 1, word: 1 }, { unique: true })
wordSchema.index({ user: 1, wordTranslation: 1 }, { unique: true })

wordSchema.pre(
	/^find/,
	function (next) {
		this.populate({
			path: 'user',
			select: 'name email'
		})

		next()
	}
)

module.exports = mongoose.model('Word', wordSchema)
