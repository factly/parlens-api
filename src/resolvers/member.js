import {MongoClient, ObjectID} from 'mongodb'

export function	index() {
	return MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then( client => {
		return client.db()
	}).then( db => {
		return db.collection('members').aggregate([
			{ 
				"$lookup": {
					"from": 'constituencies',
					"let": { "cid": "$terms.constituency" },
					"pipeline": [
						{ "$match": { "$expr": { "$eq": [ "$_id", "$$id" ] } } }
					],
					"as": "terms.constituency"
				}
			},
		]).toArray()
	})
}

export function single({ id }) {
	return MongoClient.connect('mongodb+srv://dbroot:g7gwA4vdlPmwJdV5@cluster0-z1nlv.mongodb.net/test?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then( client => {
		return client.db()
	}).then( db => {
		return db.collection('members').findOne({ _id: new ObjectID(id) })
	})
}
