import { ObjectID } from 'mongodb';

export function	index({db}) {
    return db.collection('members').find({}).toArray();
}

export function single({db}, { id }) {
    return db.collection('members').findOne({ _id: new ObjectID(id) });
}
