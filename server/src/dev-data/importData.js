const mongoose = require('mongoose')
const fs = require('fs').promises
const User = require('../models/userModel')
const Word = require('../models/wordModel')

const mongoDBUrl = process.env.MONGO_DB_URL
const mongoDBPassword = process.env.MONGO_DB_PASSWORD
const mongoDBConnectString = mongoDBUrl.replace('<password>', mongoDBPassword)

async function startServer() {
	try {
		await mongoose.connect(
			mongoDBConnectString,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true
			}
		)

		if (process.argv[2] === '--import')
			await importData()

		if (process.argv[2] === '--delete')
			await deleteData()

		process.exit(0)
	} catch (e) {
		console.log('Server Error:', e.message)

		process.exit(1)
	}
}

async function importData() {
	try {
		const userJson = await fs.readFile(`${__dirname}/userData.json`, 'utf-8')
		const wordJson = await fs.readFile(`${__dirname}/wordData.json`, 'utf-8')
		const userData = JSON.parse(userJson)
		const wordData = JSON.parse(wordJson)

		await User.create(userData, { validateBeforeSave: false })
		await Word.create(wordData)

		console.log('Data was successfully loaded!')
	} catch (err) {
		console.log(err)
	}
}

async function deleteData() {
	try {
		await User.deleteMany()
		await Word.deleteMany()

		console.log('Data was successfully deleted!')
	} catch (err) {
		console.log(err)
	}
}

startServer()
