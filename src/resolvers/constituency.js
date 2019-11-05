import { ObjectID } from 'mongodb'

//Promise way of data filter
export function index(context) {
	return context().then(db => db.collection('constituencies').find({}).toArray())
}

export function single(context, { id }) {
	return context().then(db => db.collection('constituencies').findOne({ _id: new ObjectID(id) }))
}