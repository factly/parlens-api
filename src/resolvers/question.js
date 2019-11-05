import { ObjectID } from 'mongodb'

export function index(context) {
	return context().then(db => db.collection('questions').find({}).toArray())
}

export function single(context, { id }) {
	return context().then(db => db.collection('questions').findOne({ _id: new ObjectID(id) }))
}