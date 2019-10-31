import {MongoClient, ObjectID} from 'mongodb'

//Promise way of data filter
export function index() {
	return MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then( client => {
		return client.db()
	}).then( db => {
		return db.collection('parties').find({}).toArray()
	})
}

export function single({ id }) {
	return MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then( client => {
		return client.db()
	}).then( db => {
		return db.collection('parties').findOne({ _id: new ObjectID(id) })
	})
}

export function search({ q }){
	return MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then( client => {
		return client.db()
	}).then( db => {
		return db.collection('parties').find({ $or: [{ 'name': { $regex: q, $options: 'i' } }, { 'abbr': { $regex: q, $options: 'i' } }]  }).toArray()
	})
}