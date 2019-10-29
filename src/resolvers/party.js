//import parties from '../../models/parties';
import {MongoClient} from 'mongodb'
module.exports = {
	async index() {
		let client = await MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		let db = await client.db()
		const parties = await db.collection('parties').find({}).toArray()
		return parties
	},
};