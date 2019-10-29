import {MongoClient} from 'mongodb'

//import db from './../utils/db';

module.exports = {
	async index() {
		let client = await MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		
		const parties = await client.db().collection('parties').find({}).toArray()
		return parties
	},
};