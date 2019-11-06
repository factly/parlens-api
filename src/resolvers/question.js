import { ObjectID } from 'mongodb';

export function index({db}) {
    return db.collection('questions').find({}).toArray();
}

export function single({db}, { id }) {
    return db.collection('questions').findOne({ _id: new ObjectID(id) });
}