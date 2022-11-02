const mongoose = require('mongoose')
const processListener = require('./helpers/processListener')

processListener.uncaughtException()
const app = require('./app')

const port = process.env.PORT
const mongoDBUrl = process.env.MONGO_DB_URL
const mongoDBPassword = process.env.MONGO_DB_PASSWORD
const mongoDBConnectString = mongoDBUrl.replace('<password>', mongoDBPassword)

mongoose
	.connect(
		mongoDBConnectString,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	)
	.then(() => console.log('DB connected successful!'))

const server = app.listen(
	port,
	() => console.log(`Server has been started on port ${port}!`)
)

processListener.unhandledRejection(server)
