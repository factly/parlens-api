import { ObjectID } from 'mongodb';

export function index({db}) {
    return db.collection('constituencies').find({}).toArray();
}

export function single({db}, { id }) {
    return db.collection('constituencies').findOne({ _id: new ObjectID(id) });
}